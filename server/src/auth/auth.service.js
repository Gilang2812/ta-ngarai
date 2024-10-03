const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models/UsersModels");
const { Op } = require("sequelize");
const { findUniqueUsernameOrEmail,  findUser } = require("../user/user.repository.js");
const { CustomError } = require("../../utils/CustomError");

const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.SECRET_TOKEN);
  return token;
};

const userLogin = async (email, password) => {
  const user = await findUniqueUsernameOrEmail(email,email)

  if (!user) {
    throw new CustomError("Couldn't find user",404)
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    throw new CustomError("invalid password",401)
  }

  const token = generateToken(user);

  return token;
};

const userRegister = async (body) => {

  const { email, username, password } = body;
  const existingUserByUsername = await findUser({username});
  const existingUserByEmail = await findUser({email});
  const errors = [];

    if (existingUserByUsername) {
        errors.push('Username already exists');
    }

    if (existingUserByEmail) {
        errors.push('Email already exists');
    }

    if (errors.length > 0) {
        throw new CustomError(errors.join('. '),400);
    }


  const user = User.create({
    email,
    username,
    password_hash:password
  });
  return user;
};



module.exports = { userLogin, userRegister };
