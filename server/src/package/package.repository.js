const { Sequelize } = require("sequelize");
const {
  Package,
  PackageDay,
  DetailPackage,
  Reservation,
  User,
} = require("../../models/relation");
const { getPackageIncludes } = require("../../utils/getPackgeInclude.js");

const findAllPackage = async (condition, { package, gallery, service }) => {
  const includes = getPackageIncludes({ package, gallery, service });
  const packages = await Package.findAll({
    where: condition,
    include: includes,
  });
  return packages;
};

const findPackage = async (
  id,
  { package = false, gallery = false, service = false, reservation = false }
) => {
  const includes = getPackageIncludes({ package, gallery, service });

  if (reservation) {
    includes.push({
      model: Reservation,
      as: "reservation",
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["id", "fullname"],
        },
      ],
      attributes: ["id", "rating", "review"],
    });
  }

  const packageData = await Package.findOne({
    where: {
      id,
    },
    include: includes,
    logging: console.log,
  });
  return packageData;
};

const countPackageDays = async (package_id) => {
  const packageDays = await PackageDay.count({
    where: {
      package_id,
    },
  });
  return packageDays;
};

const findUserPackage = async (userId) => {
  const packages = await Reservation.findAll({
    where: {
      user_id: userId,
      status: 1,
    },
    include: [
      {
        model: Package,
        as: "package",
        required: true,
        include: [
          {
            model: PackageDay,
            required: true,
            as: "packageDays",
            include: {
              model: DetailPackage,
              as: "detailPackages",
              where: Sequelize.where(
                Sequelize.col("`package->packageDays`.day"),
                Sequelize.col("`package->packageDays->detailPackages`.day")
              ),
            },
          },
        ],
      },
    ],
  });
  return packages;
};

const destroyPackage = async (condition) => {
  const deletedPackage = await Package.findOne({
    where: condition,
  });
  await deletedPackage.destroy();
  return deletedPackage;
};

const findPackageDay = async (key) => {
  const packageDay = await PackageDay.findOne({
    where: key,
  });
  return packageDay;
};

const findDetailPackage = async (key) => {
  const detailPackage = await DetailPackage.findOne({
    where: key,
  });
  return detailPackage;
};

const insertPackageDay = async (body) => {
  const newPackageDay = await PackageDay.create(body);
  return newPackageDay;
};

const updatePackageDay = async (condition, body) => {
  const updatedPackageDay = await PackageDay.findOne({
    where: condition,
  });

  await updatedPackageDay.update(body);
  return updatedPackageDay;
};

const destroyPackageDay = async (condition) => {
  const deletedPackageDay = await PackageDay.findOne({
    where: condition,
  });
  await deletedPackageDay.destroy();
  return deletedPackageDay;
};

const insertDetailPackage = async (body) => {
  const newDetailPackage = await DetailPackage.create(body);
  return newDetailPackage;
};

const updateDetailPackage = async (condition, body) => {
  const updatedDetailPackage = await DetailPackage.findOne({
    where: condition,
  });
  await updatedDetailPackage.update(body);
  return updatedDetailPackage;
};

const destroyDetailPackage = async (condition) => {
  const deletedDetailPackage = await DetailPackage.findOne({
    where: condition,
  });
  await deletedDetailPackage.destroy();
  return deletedDetailPackage;
};

module.exports = {
  findPackageDay,
  findDetailPackage,
  findAllPackage,
  findPackage,
  countPackageDays,
  findUserPackage,
  insertPackageDay,
  updatePackageDay,
  destroyPackageDay,
  insertDetailPackage,
  updateDetailPackage,
  destroyDetailPackage,
};
