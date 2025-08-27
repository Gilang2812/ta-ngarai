const { CustomError } = require("../../utils/CustomError");
const { findObjects } = require("../object/object.repository");
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
  findPackageByName,
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
  const requestBody = { activity, day, package_id, ...rest };

  await getDetailPackage({ activity, day, package_id });
  const newDetailPackage = await insertDetailPackage(requestBody);
  const objectCode = newDetailPackage.activity_type;
  console.log("objectCode", objectCode);
  if (objectCode === "A" || objectCode === "FC") {
    const object = await findObjects(objectCode, {
      id: newDetailPackage.object_id,
    });
    console.log("object", object);
    if (object.price) {
      const package = await findPackage(package_id);
      console.log("ini yang baru", package);
      const currentPrice = Number(package.price) || 0;
      const newPrice = Number(object.price) || 0;
      package.price = currentPrice + newPrice;
      await package.save();
    }
  }

  return newDetailPackage;
};

const editDetailPackage = async (
  condition,
  { activity, day, package_id, ...rest }
) => {
  await getDetailPackage({ activity, day, package_id });
  const requestBody = { activity, day, package_id, ...rest };
  const updatedDetailPackage = await updateDetailPackage(
    condition,
    requestBody
  );

  return updatedDetailPackage;
};

const deleteDetailPackage = async (condition) => {
  const deletedDetailPackage = await destroyDetailPackage(condition);

  if (deletedDetailPackage) {
    const objectCode = deletedDetailPackage.activity_type;
    if (objectCode === "A" || objectCode === "FC") {
      const object = await findObjects(objectCode, {
        id: deletedDetailPackage.object_id,
      });

      if (object?.price) {
        const package = await findPackage(deletedDetailPackage.package_id);
        const currentPrice = Number(package?.price) || 0;
        const oldPrice = Number(object?.price) || 0;
        const newPrice =
          currentPrice - oldPrice < 0 ? 0 : currentPrice - oldPrice;
        package.price = newPrice;
        await package.save();
      }
    }
  }

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

const getPackageByName = async (name) => {
  const package = await findPackageByName(name);
  return package;
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
  getPackageByName,
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
