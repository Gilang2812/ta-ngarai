const { CustomError } = require("../../utils/CustomError");
const {
  findCrafts,
  findCraftById,
  createCraft,
  updateCraft,
  deleteCraft,
} = require("./craft.repository");

const getCrafts = async () => {
  const crafts = await findCrafts();
  return crafts;
};

const getCraftById = async (id) => {
  const craft = await findCraftById(id);
  if (!craft) {
    throw new CustomError("Craft not found", 404);
  }
  return craft;
};

const insertCraft = async (body) => {
  const newCraft = await createCraft(body);
  return newCraft;
};

const updateCraftById = async (id, body) => {
  const craft = await getCraftById(id);
  await updateCraft(id, body);
  return craft;
};
const  deleteCraftById = async (id) => {
  const craft = await getCraftById(id);
  await deleteCraft(id);
  return craft;
};

module.exports = {
  getCrafts,
  getCraftById,
  insertCraft,
  updateCraftById,
  deleteCraftById,
};
