const { Op } = require("sequelize");
const { User } = require("../../models/UsersModels");
const {
  AuthGroupUsers,
  AuthGroup,
  DetailUserSouvenir,
} = require("../../models/relation");
const bcrypt = require("bcrypt");

const findUsers = async () => {
  const users = await User.findAll();
  return users;
};

const findUniqueUsernameOrEmail = async (username, email) => {
  const user = await User.findOne({
    where: { [Op.or]: [{ username }, { email }] },
  });
  return user;
};

const findUser = async (criteria) => {
  console.log('disini kah')
  const user = await User.findOne({
    where: criteria,
    include: [
      {
        model: DetailUserSouvenir,
        as: "detailSouvenir",
      },
    ],
  });

  return user;
};

const insertUser = async (data) => {
  data.password_hash = await bcrypt.hash("admin", 10);
  const user = await User.create(data);
  const existingAuthGroup = await findOrCreateAuthGroup(3, "admin");

  const newadmin = await AuthGroupUsers.create({
    user_id: user.id,
    group_id: existingAuthGroup.id,
  });
  return newadmin;
};

const findDetailUsers = async (users) => {
  const detailusers = await AuthGroupUsers.findAll({
    include: { model: User, as: "user", where: { deleted_at: null } },
  });
  return detailusers;
};

const findOrCreateAuthGroup = async (id, name) => {
  const [authGroup, created] = await AuthGroup.findOrCreate({
    where: { id },
    defaults: { name },
  });
  return authGroup;
};

const updateUser = async (key, body) => {
  const user = await User.update(body, {
    where: key,
  });
  return user;
};

const deleteUser = async (id) => {
  await User.destroy({ where: id });
  return true;
};

const findAuthGroupUser = async (user) => {
  const authGroupUser = await AuthGroupUsers.findOne({ where: user });
  return authGroupUser;
};

const deleteAdmin = async (data) => {
  const id = data.user_id;
  await AuthGroupUsers.destroy({ where: data });
  await deleteUser({ id });
  return true;
};

module.exports = {
  findUsers,
  findUniqueUsernameOrEmail,
  insertUser,
  findDetailUsers,
  findOrCreateAuthGroup,
  deleteAdmin,
  findUser,
  findAuthGroupUser,
  deleteUser,
  updateUser,
};
