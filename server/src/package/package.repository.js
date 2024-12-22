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

const includes = [];

const packageInclude = includes.push(
  {
    model: PackageDay,
    required: true,
    as: "packageDays",
    include: {
      model: DetailPackage,
      as: "detailPackages",
      where: Sequelize.where(
        Sequelize.col("packageDays.day"),
        Sequelize.col("packageDays->detailPackages.day")
      ),
    },
  },
  {
    model: PackageType,
    attributes: ["type_name"],
    as: "type",
  }
);
const galleryInclude = includes.push({
  model: GalleryPackage,
  as: "packageGalleries",
});
const serviceInclude = includes.push({
  model: DetailServicePackage,
  as: "detailServices",
  include: {
    model: ServicePackage,
    as: "service",
  },
});
const findAllPackage = async ({ package, gallery, service }) => {
  package && packageInclude;
  gallery && galleryInclude;
  service && serviceInclude;

  const packages = await Package.findAll({
    where: { status: 1 },
    include: includes,
  });
  return packages;
};

const findPackage = async (id) => {
  packageInclude;
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

module.exports = { findAllPackage, findPackage };
