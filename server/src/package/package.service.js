const { findAllPackage, findPackage, countPackageDays } = require("./package.repository");

const getAllPackage = async (query) => {
  const packages = await findAllPackage(query);
  return packages;
};

const getPackage = async (id) => {
  const package = await findPackage(id);
  return package;
};

const getCountPackageDays = async (package_id) => {
  const packageDays = await countPackageDays(package_id);
  return packageDays;
};
module.exports = { getAllPackage, getPackage, getCountPackageDays };
