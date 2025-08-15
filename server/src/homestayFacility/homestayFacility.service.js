const { CustomError } = require("../../utils/CustomError");
const {
  findHomestayFacilityById,
  findHomestayFacilities,
  insertHomestayFacility,
  findDetailHomestayFacilities,
  insertDetailHomestayFacility,
  destroyDetailHomestayFacility,
  findDetailHomestayFacility,
  findFacilityUnits,
} = require("./homestayFacility.repository");

const getHomestayWithFacility = async (id) => {
  const homestay = await findHomestayFacilityById(id);
  return homestay;
};

const getHomestayFacilities = async () => {
  const facilities = await findHomestayFacilities();
  return facilities;
};

const getExistDetailFacility = async (condition) => {
  const detailFacility = await findDetailHomestayFacility(condition);
  console.log("detail facility", detailFacility);
  if (detailFacility) {
    console.log("berarti ini true");
    throw new CustomError("facility is already exitst for this unit ", 409);
  }
};

const getDetailHomestayFacilities = async () => {
  const details = await findDetailHomestayFacilities();
  return details;
};
const getFacilityUnits = async () => {
  const units = await findFacilityUnits();
  return units;
};

const createHomestayFacility = async (body) => {
  const newFacility = await insertHomestayFacility(body);
  return newFacility;
};
const createDetailHomestayFacility = async (body) => {
  console.log("body", body);
  await getExistDetailFacility({
    homestay_id: body.homestay_id,
    facility_homestay_id: body.facility_homestay_id,
  });
  const newDetailHomestayFacility = await insertDetailHomestayFacility(body);
  return newDetailHomestayFacility;
};

const deleteDetailHomestayFacility = async (params) => {
  const deleted = await destroyDetailHomestayFacility(params);
  return deleted;
};
module.exports = {
  deleteDetailHomestayFacility,
  createDetailHomestayFacility,
  getHomestayWithFacility,
  getHomestayFacilities,
  createHomestayFacility,
  getDetailHomestayFacilities,
  getFacilityUnits,
};
