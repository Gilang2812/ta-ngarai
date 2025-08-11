const {
  findTourismById,
  updateTourism,
  insertGallery,
  deleteGalleryByAtribut,
} = require("./tourism.repository");

const getTourismById = async (id) => {
  const tourism = await findTourismById(id);
  if (!tourism) {
    throw new Error(`Tourism with id ${id} not found`);
  }
  return tourism;
};

const editTourismById = async (id, body) => {
  const tourism = await getTourismById(id);
  await updateTourism(id, body);
  return tourism;
};

const createTourismGallery = async (body) => {
  console.log("test service");
  const gallery = await insertGallery(body);
  return gallery;
};

const deleteTourismGallery = async (key) => {
  const gallery = await deleteGalleryByAtribut(key);
  return gallery;
};

module.exports = {
  getTourismById,
  editTourismById,
  createTourismGallery,
  deleteTourismGallery,
};
