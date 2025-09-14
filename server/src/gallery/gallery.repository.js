const { GalleryAttraction } = require("../../models/GalleryAttraction");
const { GalleryCulinary } = require("../../models/GalleryCulinary");
const { GalleryPackage } = require("../../models/GalleryPackage");
const { GalleryTourism } = require("../../models/GalleryTourismModel");
const { GalleryWorship } = require("../../models/GalleryWorship");
const {
  Package,
  PackageType,
  GalleryHomestay,
  GalleryUnit,
  GallerySouvenir,
  GalleryTraditional,
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

const insertGalleryAttraction = async (data) => {
  const created = await GalleryAttraction.create(data);
  return created;
};

const destroyGalleryAttraction = async (key) => {
  const deleted = await GalleryAttraction.destroy({ where: key });
  return deleted;
};

const insertGalleryCulinary = async (data) => {
  const culinary = await GalleryCulinary.create(data);
  return culinary;
};
const destroyGalleryCulinary = async () => {
  const culinary = await GalleryCulinary.findAll();
  return culinary;
};

const insertGalleryWorship = async (data) => {
  const created = await GalleryWorship.create(data);
  return created;
};

const destroyGalleryWorship = async (key) => {
  const deleted = await GalleryWorship.destroy({ where: key });
  return deleted;
};

const insertGalleryTraditional = async (data) => {
  const created = await GalleryTraditional.create(data);
  return created;
};

const destroyGalleryTraditional = async (key) => {
  const deleted = await GalleryTraditional.destroy({ where: key });
  return deleted;
};

module.exports = {
  findGalleryTourisms,
  destroyGalleryTraditional,
  insertGalleryTraditional,
  findGalleryPackages,
  insertGallerySouvenir,
  destroyGalleryPackage,
  destroyGalleryHomestay,
  insertGalleryPackage,
  insertGalleryHomestay,
  insertGalleryUnitHomestay,
  destroyGalleryUnitHomestay,
  destroyGallerySouvenir,
  destroyGalleryAttraction,
  destroyGalleryWorship,
  insertGalleryCulinary,
  destroyGalleryCulinary,
  insertGalleryWorship,
  destroyGalleryWorship,
  insertGalleryAttraction,
};
