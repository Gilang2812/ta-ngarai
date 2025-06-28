const { CustomError } = require("../../utils/CustomError");
const {
  insertSouvenirPlace,
  findSouvenirPlace,
  findSouvenirPlaceById,
  updateSouvenirPlace,
  deleteSouvenirPlace,
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
const createSouvenirPlace = async (body) => {
  const souvenirPlace = await insertSouvenirPlace(body);
  return souvenirPlace;
};

const editSouvenirPlaceById = async (id, body) => {
  const souvenirPlace = await getSouvenirPlaceById(id);
  await updateSouvenirPlace(id, body);
  return souvenirPlace;
};

const deleteSouvenirPlaceById = async (id) => {
  const souvenirPlace = await getSouvenirPlaceById(id);

  await deleteSouvenirPlace(id);

  return souvenirPlace;
};

module.exports = {
  createSouvenirPlace,
  getSouvenirPlace,
  getSouvenirPlaceById,
  editSouvenirPlaceById,
  deleteSouvenirPlaceById,
};
