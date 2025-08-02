const { CustomError } = require("../../utils/CustomError");
const {
  findHomestays,
  findHomestayById,
  insertHomestay,
  destroyHomestay,
  updateHomestay,
  findUnitHomestays,
  findAllUnitHomestays,
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

const getUnitHomestays = async (newCheckIn) => {
  const units = await findUnitHomestays(newCheckIn);
  return units;
};

const getAllUnitHomestays = async ({homestay_id}) => {
  const units = await findAllUnitHomestays({homestay_id});
  return units;
};

const existsHomestay = async (id) => {
  const homestay = await findHomestayById(id);
  if (homestay) {
    throw new CustomError("homestay already exists", 400);
  }
  return homestay;
};
const createHomestay = async (body) => {
  await existsHomestay(body.id);
  const newHomestay = await insertHomestay(body);
  return newHomestay;
};

const editHomestay = async (body) => {
  const homestay = await updateHomestay(body);
  return homestay;
};
const deleteHomestay = async (id) => {
  await getHomestay(id);

  const homestay = await destroyHomestay(id);
  return homestay;
};

module.exports = {
  getAllHomestay,
  getHomestay,
  createHomestay,
  deleteHomestay,
  editHomestay,
  getUnitHomestays,
  getAllUnitHomestays,
};
