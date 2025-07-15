const {
  findDetailCrafts,
  findDetailCraft,
  insertDetailCraft,
  editDetailCraft,
  destroyDetailCraft,
  findOrderDetailCraft,
} = require("./detailCraft.repository");

const { CustomError } = require("../../utils/CustomError");

const getDetailCrafts = async (condition, include) => {
  const detailCrafts = await findDetailCrafts(condition, include);
  return detailCrafts;
};

const selectDetailCrafts = async (includeKeys) => {
  const condition = {};
  const detailCrafts = await findDetailCrafts(condition, includeKeys);
  return detailCrafts;
};
const getDetailCraft = async (key, include) => {
  const detailCraft = await findDetailCraft(key, include);
  if (!detailCraft) {
    throw new CustomError("Detail craft not found", 404);
  }
  return detailCraft;
};
const createDetailCraft = async (body) => {
  const existingDetailCraft = await getDetailCrafts({
    craft_variant_id: body.craft_variant_id,
    id_souvenir_place: body.id_souvenir_place,
  });
  console.log("body", body);
  console.log("existingDetailCraft", existingDetailCraft);
  if (existingDetailCraft.length > 0) {
    throw new CustomError("Detail craft already exists", 400);
  }
  const newDetailCraft = await insertDetailCraft(body);
  return newDetailCraft;
};
const updateDetailCraft = async (key, body) => {
  const updatedDetailCraft = await getDetailCraft(key, ["craftGalleries"]);
  await editDetailCraft(key, body);
  return updatedDetailCraft;
};
const deleteDetailCraft = async (key) => {
  const deletedDetailCraft = await getDetailCraft(key);
  await destroyDetailCraft(key);
  return deletedDetailCraft;
};

const getOrderDetailCraft = async (key) => {
  const orderDetailCraft = await findOrderDetailCraft(key);

  return orderDetailCraft;
};

module.exports = {
  getDetailCrafts,
  getDetailCraft,
  createDetailCraft,
  updateDetailCraft,
  deleteDetailCraft,
  selectDetailCrafts,
  getOrderDetailCraft
};
