const {
  findVariants,
  findVariantById,
  createVariant,
  updateVariant,
  deleteVariant,
} = require("./variant.repository");

const { CustomError } = require("../../utils/CustomError");

const getVariants = async () => {
  const variants = await findVariants();
  return variants;
};

const getVariantById = async (id) => {
  const variant = await findVariantById(id);
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
  const result = await updateVariant(id, body);
  return result;
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
