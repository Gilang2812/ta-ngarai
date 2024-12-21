const { Package, PackageDay, DetailPackage } = require("../../models/relation");

const findAllPackage = async () => {
  const packages = await Package.findAll({
    where: { status: 1, custom: 0 },
    include: [{
        model:PackageDay,
        as: "packageDays",
        include: {
          model: DetailPackage,
          as: "detailPackages"
        },
      }],
  });
  return packages;
};

module.exports = { findAllPackage };
