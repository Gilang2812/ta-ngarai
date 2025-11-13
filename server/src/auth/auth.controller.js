const router = require("express").Router();
const bcrypt = require("bcrypt");
const {
  userLogin,
  userRegister,
  googleLogin,
  getLoginResponse,
  generateToken,
} = require("./auth.service");
const { editUser, getUser } = require("../user/user.service.js");
const { verifyToken } = require("../middlewares/authentication.js");
const { findUniqueUsernameOrEmail } = require("../user/user.repository.js");

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

    console.log("result login:", result);
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

    user = await getLoginResponse(user);
    const token = generateToken(user);

    res.json({ user, token });
  } catch (error) {
    next(error);
  }
});

router.post("/unique-field", async (req, res) => {
  const { field } = req.body;

  try {
    // cek apakah email sudah ada
    const rows = await findUniqueUsernameOrEmail(field, field);

    if (rows) {
      return res.json({ available: false }); // email sudah dipakai
    } else {
      return res.json({ available: true }); // email masih available
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ available: false });
  }
});
router.patch("/user/update", verifyToken, async (req, res, next) => {
  try {
    const { fullname, username, phone, address } = req.body;
    const updatedUser = await editUser(
      { id: req.user.id },
      { fullname, phone, address, username }
    );

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.patch("/user/change-password", verifyToken, async (req, res, next) => {
  try {
    const { newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const updatedUser = await editUser(
      { id: req.user.id },
      { password: bcrypt.hashSync(newPassword, 10) }
    );

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
