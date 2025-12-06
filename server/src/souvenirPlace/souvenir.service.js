const { CustomError } = require("../../utils/CustomError");
const {
  insertSouvenirPlace,
  findSouvenirPlace,
  findSouvenirPlaceById,
  deleteSouvenirPlace,
  insertDetailUserSouvenir,
  findUserSouvenirPlace,
  findDetailUserSouvenir,
  updateDetailUserSouvenir,
  destoryDetailUserSouvenir,
} = require("./souvenir.repository");

const getSouvenirPlace = async (include = false) => {
  const souvenirPlace = await findSouvenirPlace(include);
  return souvenirPlace;
};

const getSouvenirPlaceById = async (id) => {
  const souvenirPlace = await findSouvenirPlaceById(id);
  if (!souvenirPlace) {
    throw new CustomError(`souvenir is not found`, 404);
  }
  return souvenirPlace;
};

const getUserSouvenirPlace = async (user_id) => {
  const userSouvenir = await findUserSouvenirPlace(user_id);
  return userSouvenir;
};

const createSouvenirPlace = async (body) => {
  const souvenirPlace = await insertSouvenirPlace(body);
  return souvenirPlace;
};

const getDetailUserSouvenir = async (codition) => {
  return findDetailUserSouvenir(codition);
};
const createDetailUserSouvenir = async (body) => {
  const newDetail = await insertDetailUserSouvenir(body);
  return newDetail;
};
const editSouvenirPlaceById = async (id, body) => {
  const souvenirPlace = await getSouvenirPlaceById(id);
  Object.assign(souvenirPlace, body);
  await souvenirPlace.save();
  return souvenirPlace;
};

const editDetailUserSouvenir = (key, body) => {
  return updateDetailUserSouvenir(key, body);
};
const deleteSouvenirPlaceById = async (id) => {
  const souvenirPlace = await getSouvenirPlaceById(id);

  await deleteSouvenirPlace(id);

  return souvenirPlace;
};

const deleteDetailUserSouvenir = (key) => {
  return destoryDetailUserSouvenir(key);
};

module.exports = {
  createSouvenirPlace,
  getSouvenirPlace,
  getSouvenirPlaceById,
  editSouvenirPlaceById,
  deleteSouvenirPlaceById,
  createDetailUserSouvenir,
  getUserSouvenirPlace,
  getDetailUserSouvenir,
  editDetailUserSouvenir,
  deleteDetailUserSouvenir,
};
