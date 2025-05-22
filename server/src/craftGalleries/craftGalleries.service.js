const {
  findGalleries,
  findGalleryById,
  createGallery,
  updateGallery,
  bulkInsertGalleries,
  deleteGallery,
} = require("./craftGalleries.repository");

const { CustomError } = require("../../utils/CustomError");

const getGalleries = async () => {
  const galleries = await findGalleries();
  return galleries;
};
const getGalleryById = async (id) => {
  const gallery = await findGalleryById(id);
  if (!gallery) {
    throw new CustomError("Gallery not found", 404);
  }
  return gallery;
};

const insertGallery = async (body) => {
  const newGallery = await createGallery(body);
  return newGallery;
};
const updateGalleryById = async (id, body) => {
  const gallery = await getGalleryById(id);
  await updateGallery(id, body);
  return gallery;
};
const deleteGalleryById = async (id) => {
  const gallery = await getGalleryById(id);
  await deleteGallery(id);
  return;
};

const insertGalleries = async (galleries) => {
  const newGalleries = await bulkInsertGalleries(galleries);
  return newGalleries;
};

module.exports = {
  getGalleries,
  getGalleryById,
  insertGallery,
  updateGalleryById,
  deleteGalleryById,
};
