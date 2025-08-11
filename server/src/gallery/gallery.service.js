const {
  findGalleryTourisms,
  findGalleryPackages,
  destroyGalleryPackage,
  insertGalleryPackage,
} = require("./gallery.repository");

const getGalleryTourisms = async () => {
  const galleryTourism = await findGalleryTourisms();
  return galleryTourism;
};

const getGalleryPackages = async (custom) => {
  const galleryPackages = await findGalleryPackages(custom);
  return galleryPackages;
};

const createGalleryPackage = async (data) => {
  const newGalleryPackage = await insertGalleryPackage(data);
  return newGalleryPackage;
};

const deleteGalleryPackage = async (key) => {
  const deleted = await destroyGalleryPackage(key);
  return deleted;
};

module.exports = {
  getGalleryTourisms,
  getGalleryPackages,
  deleteGalleryPackage,
  createGalleryPackage
};
