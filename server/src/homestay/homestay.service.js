const { CustomError } = require("../../utils/CustomError");
const {
  findHomestays,
  findHomestayById,
  insertHomestay,
  destroyHomestay,
  updateHomestay,
  findUnitHomestays,
  findAllUnitHomestays,
  findHomestay,
  findEditHomestay,
  insertUnitHomestay,
  insertFacilityUnitDetail,
  insertFacilityUnit,
  deleteUnitHomestay,
  deleteFacilityUnitDetail,
  findUnitTypes,
  updateUnitHomestay,
  findUnitHomestay,
  findFacilityUnitDetail,
} = require("./homestay.repository");
const getAllHomestay = () => {
  const allHomestay = findHomestays();
  return allHomestay;
};

const getHomestay = async (id) => {
  const homestay = await findHomestayById(id);
  if (!homestay) {
    throw new CustomError("homestay is not exists", 404);
  }
  return homestay;
};

const getEditHomestay = async (condition) => {
  const homestay = await findEditHomestay(condition);
  return homestay;
};

const getUnitHomestays = async (newCheckIn) => {
  const units = await findUnitHomestays(newCheckIn);
  return units;
};

const getAllUnitHomestays = async ({ homestay_id }) => {
  const units = await findAllUnitHomestays({ homestay_id });
  return units;
};

const existsHomestay = async (id) => {
  const homestay = await findHomestay({ id });
  if (homestay) {
    throw new CustomError("homestay already exists", 400);
  }
  return homestay;
};

const notFoundHomestay = async (id) => {
  const homestay = await findHomestay({ id });
  if (!homestay) {
    throw new CustomError("homestay not found", 404);
  }
  return homestay;
};

const existDetailFacility = async (key) => {
  const facility = await findFacilityUnitDetail(key);
  if (facility) {
    throw new CustomError("facility unit already exists for this unit", 400);
  }
  return facility;
};

const getUnitTypes = async () => {
  const unitTypes = await findUnitTypes();
  return unitTypes;
};
const getUnitHomestay = async (key) => {
  const unit = await findUnitHomestay(key);

  if (!unit) {
    throw new CustomError("unit not found", 404);
  }
  return unit;
};

const createHomestay = async (body) => {
  await existsHomestay(body.id);
  const newHomestay = await insertHomestay(body);
  return newHomestay;
};

const editHomestay = async (body) => {
  const homestay = await findEditHomestay({ id: body.id });
  await updateHomestay(body);
  return homestay;
};
const deleteHomestay = async (id) => {
  const homestay = await notFoundHomestay(id);
  await destroyHomestay(id);
  return homestay;
};

const createUnitHomestay = async (body) => {
  const newUnitHomestay = await insertUnitHomestay(body);
  return newUnitHomestay;
};

const createFacilityUnitDetail = async (body) => {
  const { homestay_id, unit_type, unit_number, facility_unit_id } = body;
  await existDetailFacility({ homestay_id, unit_type, unit_number, facility_unit_id });
  const newFacilityUnitDetail = await insertFacilityUnitDetail(body);
  return newFacilityUnitDetail;
};

const createFacilityUnit = async (body) => {
  const newFacilityUnit = await insertFacilityUnit(body);
  return newFacilityUnit;
};

const editUnitHomestay = async (key, body) => {
  const updatedUnitHomestay = await getUnitHomestay(key);
  await updateUnitHomestay(key, body);
  return updatedUnitHomestay;
};

const destroyUnitHomestay = async (key) => {
  const deletedUnitHomestay = await deleteUnitHomestay(key);
  return deletedUnitHomestay;
};

const destroyFacilityUnitDetail = async (key) => {
  const deletedFacilityUnitDetail = await deleteFacilityUnitDetail(key);
  return deletedFacilityUnitDetail;
};

module.exports = {
  getAllHomestay,
  getHomestay,
  createHomestay,
  createUnitHomestay,
  deleteHomestay,
  editHomestay,
  getUnitHomestays,
  getAllUnitHomestays,
  getEditHomestay,
  createFacilityUnitDetail,
  createFacilityUnit,
  destroyFacilityUnitDetail,
  editUnitHomestay,
  destroyUnitHomestay,
  getUnitTypes,
};
