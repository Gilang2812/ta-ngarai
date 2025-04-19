// utils/includeBuilders/packageIncludeBuilder.js

const { Sequelize } = require("sequelize");
const {
  PackageDay,
  DetailPackage,
  GalleryPackage,
  DetailServicePackage,
  ServicePackage,
  PackageType,
} = require("../models/relation");

function getPackageIncludes({ package, gallery, service }) {
  const includes = [];

  if (package) {
    includes.push(
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
  }

  if (gallery) {
    includes.push({
      model: GalleryPackage,
      as: "packageGalleries",
    });
  }

  if (service) {
    includes.push({
      model: DetailServicePackage,
      as: "detailServices",
      include: {
        model: ServicePackage,
        as: "service",
      },
    });
  }

  return includes;
}

module.exports = { getPackageIncludes };
