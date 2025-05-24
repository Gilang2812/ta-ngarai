const { Craft } = require("../../models/CraftModel");
const CraftVariantGallery = require("../../models/CraftVariantGalleryModel");
const CraftVariant = require("../../models/CraftVariantModel");
const { buildIncludeModels } = require("./variant.utils");

const findVariants = async (includes = []) => {
  const include = buildIncludeModels(includes);
  return CraftVariant.findAll({ include });
};

const findVariantById = async (id, includes = []) => {
  const include = buildIncludeModels(includes);
  return CraftVariant.findOne({
    where: {
      id: id,
    },
    include,
  });
};

const createVariant = async (body) => {
  return CraftVariant.create(body);
};
const updateVariant = async (id, body) => {
  return CraftVariant.update(body, {
    where: {
      id,
    },
  });
};
const deleteVariant = async (id) => {
  return CraftVariant.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  findVariants,
  findVariantById,
  createVariant,
  updateVariant,
  deleteVariant,
};
