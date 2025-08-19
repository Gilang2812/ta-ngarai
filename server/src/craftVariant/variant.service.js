const {
  findVariants,
  findVariantById,
  createVariant,
  updateVariant,
  deleteVariant,
} = require("./variant.repository");

const { CustomError } = require("../../utils/CustomError");
const {
  findDetailCraft,
} = require("../detailMarketplaceCraft/detailCraft.repository");
const {
  getDetailCrafts,
} = require("../detailMarketplaceCraft/detailCraft.service");

const getVariants = async (includeKeys) => {
  const variants = await findVariants(includeKeys);
  return variants;
};

const getVariantById = async (id, includeKeys) => {
  const variant = await findVariantById(id, includeKeys);
  if (!variant) {
    throw new CustomError("Variant not found", 404);
  }
  return variant;
};

const insertVariant = async (body) => {
  const newVariant = await createVariant(body);
  return newVariant;
};
const updateVariantById = async (id, body) => {
  const variant = await getVariantById(id);
  await updateVariant(id, body);
  return variant;
};
const deleteVariantById = async (id) => {
  const variant = await getVariantById(id);
  await deleteVariant(id);
  return variant;
};
module.exports = {
  getVariants,
  getVariantById,
  insertVariant,
  updateVariantById,
  deleteVariantById,
};
