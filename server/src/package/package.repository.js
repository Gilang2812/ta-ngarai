const { Sequelize } = require("sequelize");
const {
  Package,
  PackageDay,
  DetailPackage,
  GalleryPackage,
  DetailServicePackage,
  ServicePackage,
  PackageType,
} = require("../../models/relation");
const { getPackageIncludes } = require("../../utils/getPackgeInclude.js");

const findAllPackage = async ({ package, gallery, service }) => {
  const includes = getPackageIncludes({ package, gallery, service });
  const packages = await Package.findAll({
    where: { status: 1 },
    include: includes,
  });
  return packages;
};

const findPackage = async (id) => {
  galleryInclude;
  serviceInclude;

  const package = await Package.findOne({
    where: {
      id,
    },
    include: includes,
    logging: console.log,
  });
  return package;
};

const countPackageDays = async (package_id) => {
  const packageDays = await PackageDay.count({
    where: {
      package_id,
    },
  });
  return packageDays;
};

module.exports = { findAllPackage, findPackage, countPackageDays };
