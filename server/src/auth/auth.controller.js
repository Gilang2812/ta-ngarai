const router = require("express").Router();
const { userLogin, userRegister, googleLogin } = require("./auth.service");
const { registerSchema, loginScheme } = require("./auth.validation.js");
const { CustomError } = require("../../utils/CustomError.js");
const { validateData } = require("../middlewares/validation.js");

router.post("/login",   async (req, res, next) => {
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
module.exports = router;
