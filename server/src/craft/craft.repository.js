const { CraftVariant, Craft, SouvenirPlace } = require("../../models/relation");
const { buildIncludeModels } = require("../craftVariant/variant.utils");

const findCrafts = async () => {
  const craft = await Craft.findAll({
    include: [
      {
        model: CraftVariant,
        as: "variants",
        attributes: ["id", "id_craft", "name"],
      },
    ],
    attributes: ["id", "name"],
  });
  return craft;
};

const findCraftById = async (id) => {
  const craft = await Craft.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: CraftVariant,
        as: "variants",
        attributes: ["id", "id_craft", "name"],
      },
    ],
    attributes: ["id", "name"],
  });
  return craft;
};

const createCraft = async (body) => {
  const newCraft = await Craft.create(body);
  return newCraft;
};
const updateCraft = async (id, body) => {
  const updatedCraft = await Craft.update(body, {
    where: {
      id,
    },
  });
  return updatedCraft;
};

const deleteCraft = async (id) => {
  const deletedCraft = await Craft.destroy({
    where: {
      id,
    },
  });
  return deletedCraft;
};

module.exports = {
  findCrafts,
  findCraftById,
  createCraft,
  updateCraft,
  deleteCraft,
};
