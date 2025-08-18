const router = require("express").Router();
const {
  userLogin,
  userRegister,
  googleLogin,
  getLoginResponse,
  generateToken,
} = require("./auth.service");
const { editUser, getUser } = require("../user/user.service.js");
const { verifyToken } = require("../middlewares/authentication.js");

router.post("/login", async (req, res, next) => {
  try {
    let { email, password, credential } = req.body;
    console.log("Login request:", req.body);
    let result = null;
    if (!credential) {
      result = await userLogin(email, password);
    } else {
      result = await googleLogin(credential);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const newUser = await userRegister(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get("/auth/me", verifyToken, async (req, res, next) => {
  try {
    let user = await getUser({ id: req.user.id });

    user = getLoginResponse(user);
    const token = generateToken(user);

    res.json({ user, token });
  } catch (error) {
    next(error);
  }
});

router.patch("/user/update", verifyToken, async (req, res, next) => {
  try {
    const { fullname, phone, address } = req.body;
    const updatedUser = await editUser(
      { id: req.user.id },
      { fullname, phone, address }
    );

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
