const { Craft } = require("../../models/CraftModel");
const CraftVariantGallery = require("../../models/CraftVariantGalleryModel");
const CraftVariant = require("../../models/CraftVariantModel");

const findVariants = async () => {
  return CraftVariant.findAll({
    include: [
      {
        model: CraftVariantGallery,
        as: "craftGalleries",
      },
      {
        model: Craft,
        as: "craft",
      },
    ],
  });
};

const findVariantById = async (id) => {
  return CraftVariant.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: CraftVariantGallery,
        as: "craftGalleries",
      },
      {
        model: Craft,
        as: "craft",
      },
    ],
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
