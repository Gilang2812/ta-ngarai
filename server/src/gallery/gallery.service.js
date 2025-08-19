const {
  findGalleryTourisms,
  findGalleryPackages,
  destroyGalleryPackage,
  insertGalleryPackage,
  insertGalleryHomestay,
  destroyGalleryHomestay,
  insertGalleryUnitHomestay,
  destroyGalleryUnitHomestay,
  insertGallerySouvenir,
  destroyGallerySouvenir,
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

const createGalleryHomestay = async (data) => {
  const newGalleryHomestay = await insertGalleryHomestay(data);
  return newGalleryHomestay;
};

const createGalleryUnitHomestay = async (data) => {
  const newGalleryUnitHomestay = await insertGalleryUnitHomestay(data);
  return newGalleryUnitHomestay;
};

const deleteGalleryHomestay = async (condition) => {
  return (deleted = await destroyGalleryHomestay(condition));
};

const deleteGalleryUnit = async (condition) => {
  return (deleted = await destroyGalleryUnitHomestay(condition));
};

const createGallerySouvenir = async (data) => {
  const newGallerySouvenir = await insertGallerySouvenir(data);
  return newGallerySouvenir;
};

const deleteGallerySouvenir = async (condition) => {
  return (deleted = await destroyGallerySouvenir(condition));
};

module.exports = {
  getGalleryTourisms,
  getGalleryPackages,
  deleteGalleryPackage,
  createGalleryHomestay,
  createGalleryPackage,
  deleteGalleryHomestay,
  createGalleryUnitHomestay,
  deleteGalleryUnit,
  createGallerySouvenir,
  deleteGallerySouvenir,
};
