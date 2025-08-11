const { CustomError } = require("../../utils/CustomError");
const {
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
  findPackageDay,
  findDetailPackage,
  destroyPackage,
  updatePackage,
  insertPackage,
  findPackageTypes,
  findPackageType,
  editPackageType,
  insertPackageType,
  destroyPackageType,
} = require("./package.repository");

const getAllPackage = async (condition, query) => {
  const packages = await findAllPackage(condition, query);
  return packages;
};

const getPackage = async (
  id,
  { package = false, gallery = false, service = false, reservation = false }
) => {
  const packageData = await findPackage(id, {
    package,
    gallery,
    service,
    reservation,
  });
  if (!packageData) {
    throw new CustomError("Package not found", 404);
  }
  return packageData;
};

const createPackage = async (body) => {
  const newPackage = await insertPackage(body);
  return newPackage;
};

const getPackageDay = async (key) => {
  const packageDay = await findPackageDay(key);
  if (packageDay) {
    throw new CustomError(
      "Package day already exists please change the day or package ID",
      409
    );
  }
  return packageDay;
};

const getDetailPackage = async (key) => {
  const detailPackage = await findDetailPackage(key);
  if (detailPackage) {
    throw new CustomError(
      "Detail package already exists please change the activity values",
      409
    );
  }
  return detailPackage;
};

const getCountPackageDays = async (package_id) => {
  const packageDays = await countPackageDays(package_id);
  return packageDays;
};

const getUserPackage = async (userId) => {
  const packages = await findUserPackage(userId);
  return packages;
};

const editPackage = async (key, body) => {
  const updatedPackage = await getPackage(key.id, {
    gallery: false,
    package: false,
    reservation: false,
    service: false,
  });
  await updatePackage(key, body);
  return updatedPackage;
};

const editAllDataPackage = async (key, body) => {
  const updatedPackage = await getPackage(key.id, {
    gallery: true,
    package: false,
    reservation: false,
    service: false,
  });
  await updatePackage(key, body);
  return updatedPackage;
};

const deletePackage = async (condition) => {
  const deletedPackage = await destroyPackage(condition);
  return deletedPackage;
};

const createPackageDay = async ({ day, package_id, ...rest }) => {
  await getPackageDay({ day, package_id });
  const newPackageDay = await insertPackageDay({ day, package_id, ...rest });
  return newPackageDay;
};

const editPackageDay = async (
  condition,
  { day, package_id, current_day, ...rest }
) => {
  if (!(day == current_day)) {
    await getPackageDay({ day, package_id });
  }
  const updatedPackageDay = await updatePackageDay(condition, {
    day,
    package_id,
    ...rest,
  });
  return updatedPackageDay;
};

const deletePackageDay = async (condition) => {
  const deletedPackageDay = await destroyPackageDay(condition);
  return deletedPackageDay;
};

const createDetailPackage = async ({ activity, day, package_id, ...rest }) => {
  await getDetailPackage({ activity, day, package_id });
  const newDetailPackage = await insertDetailPackage({
    activity,
    day,
    package_id,
    ...rest,
  });
  return newDetailPackage;
};

const editDetailPackage = async (
  condition,
  { activity, day, package_id, ...rest }
) => {
  await getDetailPackage({ activity, day, package_id });
  const updatedDetailPackage = await updateDetailPackage(condition, {
    activity,
    day,
    package_id,
    ...rest,
  });
  return updatedDetailPackage;
};

const deleteDetailPackage = async (condition) => {
  const deletedDetailPackage = await destroyDetailPackage(condition);
  return deletedDetailPackage;
};

const getPackageTypes = async () => {
  const packageTypes = await findPackageTypes();
  return packageTypes;
};

const getPackageType = async (key) => {
  const packageType = await findPackageType(key);
  if (!packageType) {
    throw new CustomError("Package type not found", 404);
  }
  return packageType;
};

const createPackageType = async (body) => {
  const newPackageType = await insertPackageType(body);
  return newPackageType;
};

const updatePackageType = async (key, body) => {
  const updatedPackageType = await getPackageType(key);
  await editPackageType(key, body);
  return updatedPackageType;
};

const deletePackageType = async (key) => {
  const deletedPackageType = await getPackageType(key);
  await destroyPackageType(key);
  return deletedPackageType;
};

module.exports = {
  getAllPackage,
  getPackage,
  getCountPackageDays,
  getUserPackage,
  createPackageDay,
  editPackageDay,
  editDetailPackage,
  createDetailPackage,
  deleteDetailPackage,
  deletePackageDay,
  deletePackage,
  editPackage,
  createPackage,
  editAllDataPackage,
  getPackageTypes,
  destroyPackageType,
  getPackageType,
  createPackageType,
  updatePackageType,
  deletePackageType,
};
