const { Op } = require("sequelize");
const { CustomBulkError, CustomError } = require("../../utils/CustomError");

const {  insertUser, findDetailUsers, findUser, deleteAdmin, findAuthGroupUser } = require("./user.repository.js");


const getAllUsers = async () => {
  const users = await findDetailUsers({});
  return users;
};

const createNewUser = async (data) => {
  const { username, email } = data;
  const existingUserByUsername = await findUser({username});
  const existingUserByEmail = await findUser({email});
  const errors = {};

    if (existingUserByUsername) {
        errors.username='Username already exists'
    }

    if (existingUserByEmail) {
        errors.email='Email already exists'
    }

    if (Object.keys(errors).length > 0) {
      console.log("ada error", errors);
      throw new CustomBulkError(errors, 400);
  }

    const newUser = await insertUser(data)
  return newUser;
};

const deleteDetailUser= async (data) => {
  const existingAuthUser = await findAuthGroupUser(data);
  if (!existingAuthUser) {
    throw new CustomError('User not found', 404);
  }
  const user = await deleteAdmin(data)

  return user
};
// const updateUser = asfun

module.exports = { getAllUsers, createNewUser,deleteDetailUser };
