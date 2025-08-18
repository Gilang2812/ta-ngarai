const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models/UsersModels");
const { Op } = require("sequelize");
const {
  findUniqueUsernameOrEmail,
  findUser,
} = require("../user/user.repository.js");
const { CustomError } = require("../../utils/CustomError");

const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.SECRET_TOKEN);
  return token;
};

const getLoginResponse = (user) => {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.fullname,
    username: user.username,
    role: user.id_role,
    phone: user.phone,
    address: user.address,
    store: user.detailSouvenir,
  };
};
const userLogin = async (email = "", password) => {
  const user = await findUniqueUsernameOrEmail(email, email);

  if (!user) {
    throw new CustomError(
      "User not found. Please check your email and try again.",
      404
    );
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    throw new CustomError("invalid password", 400);
  }

  const response = getLoginResponse(user);
  const token = generateToken(response);

  return { token, user: response };
};

const googleLogin = async (credential) => {
  const decoded = jwt.decode(credential);
  const { email, name } = decoded;
  console.log("disinikah error nya");
  if (!email) {
    throw new CustomError("Invalid Google credential", 400);
  }

  let user = await findUser({ email });
  console.log("coba disini");
  if (!user) {
    user = await User.create({
      email,
      fullname: name,
      password_hash: "",
      role: "user",
    });
  }

  const response = getLoginResponse(user);
  const token = generateToken(response);
  return { token, user: response };
};

const userRegister = async (body) => {
  const { email, username, password } = body;
  const existingUserByUsername = await findUser({ username });
  const existingUserByEmail = await findUser({ email });
  const errors = [];
  if (existingUserByEmail) {
    errors.push("Email already exists");
  }
  if (existingUserByUsername) {
    errors.push("Username already exists");
  }

  if (errors.length > 0) {
    throw new CustomError(errors.join(". "), 400);
  }

  const user = User.create({
    email,
    username,
    password_hash: password,
  });
  return user;
};

module.exports = { userLogin, userRegister, googleLogin, generateToken };
