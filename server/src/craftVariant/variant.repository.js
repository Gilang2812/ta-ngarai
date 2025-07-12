const { Craft } = require("../../models/CraftModel");
const CraftVariant = require("../../models/CraftVariantModel");

const findVariants = async (includes = []) => {
  const variants = await CraftVariant.findAll({
    include: [
      {
        model: Craft,
        as: "craft",
        attributes: ["id", "name"],
      },
    ],
    attributes: ["id", "name", "id_craft"],
  });
  return variants;
};

const findVariantById = async (id, includes = []) => {
  return CraftVariant.findOne({
    where: {
      id: id,
    },
    attributes: ["id", "name", "id_craft"],
    include: [
      {
        model: Craft,
        as: "craft",
        attributes: ["id", "name"],
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
