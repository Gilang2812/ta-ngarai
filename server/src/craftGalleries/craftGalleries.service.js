const {
  findGalleries,
  findGallery,
  createGallery,
  updateGallery,
  bulkCreateGalleries,
  deleteGallery,
} = require("./craftGalleries.repository");

const { CustomError } = require("../../utils/CustomError");

const getGalleries = async () => {
  const galleries = await findGalleries();
  return galleries;
};
const getGallery = async (condition) => {
  const gallery = await findGallery(condition);
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
  const gallery = await getGallery({ id });
  await updateGallery(id, body);
  return gallery;
};
const deleteGalleryByAtribut = async (condition) => {
  const galerry = await deleteGallery(condition);
  return galerry;
};

const insertGalleries = async (galleries) => {
  const newGalleries = await bulkCreateGalleries(galleries);
  return newGalleries;
};

module.exports = {
  getGalleries,
  getGallery,
  insertGallery,
  updateGalleryById,
  deleteGalleryByAtribut,
  insertGalleries,
};
