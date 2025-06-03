const { CraftVariant, Craft,SouvenirPlace } = require("../../models/relation"); 
const { buildIncludeModels } = require("../craftVariant/variant.utils");

const findCrafts = async () => {
  const craft = await Craft.findAll();
  return craft;
};

const findCraftById = async (id) => {
  const include = buildIncludeModels(['checkout','craftGalleries'])
  const craft = await Craft.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: CraftVariant,
        as: "variants",
        attributes:['id','id_craft','name','price','stock','modal','description'],
        include
      },
      {
        model:SouvenirPlace,
        as:'souvenirPlace',
        attributes:['name', 'address']
      }
    ],
    attributes:['id','id_souvenir_place','name'
    ]
  },);
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
