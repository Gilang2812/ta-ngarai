const { GalleryPackage } = require("../../models/GalleryPackage");
const { GalleryTourism } = require("../../models/GalleryTourismModel");
const {
  TourismVillage,
  Package,
  PackageType,
  GalleryHomestay,
  GalleryUnit,
  GallerySouvenir,
} = require("../../models/relation");

const findGalleryTourisms = async () => {
  const tourisms = await GalleryTourism.findAll();
  return tourisms;
};

const findGalleryPackages = async (custom) => {
  const packages = await GalleryPackage.findAll({
    include: {
      model: Package,
      include: { model: PackageType },
      where: custom,
    },
  });
  return packages;
};

const insertGalleryPackage = async (data) => {
  const created = await GalleryPackage.create(data);
  return created;
};

const destroyGalleryPackage = async (key) => {
  const deleted = await GalleryPackage.destroy({ where: key });
  return deleted;
};

const insertGalleryHomestay = async (data) => {
  const created = await GalleryHomestay.create(data);
  return created;
};

const destroyGalleryHomestay = async (key) => {
  const deleted = await GalleryHomestay.destroy({ where: key });
  return deleted;
};

const insertGalleryUnitHomestay = async (data) => {
  const created = await GalleryUnit.create(data);
  return created;
};

const destroyGalleryUnitHomestay = async (key) => {
  const deleted = await GalleryUnit.destroy({ where: key });
  return deleted;
};

const insertGallerySouvenir = async (data) => {
  const created = await GallerySouvenir.create(data);
  return created;
};
const destroyGallerySouvenir = async (key) => {
  const deleted = await GallerySouvenir.destroy({ where: key });
  return deleted;
};

module.exports = {
  findGalleryTourisms,
  findGalleryPackages,
  insertGallerySouvenir,
  destroyGalleryPackage,
  destroyGalleryHomestay,
  insertGalleryPackage,
  insertGalleryHomestay,
  insertGalleryUnitHomestay,
  destroyGalleryUnitHomestay,
  destroyGallerySouvenir,
};
