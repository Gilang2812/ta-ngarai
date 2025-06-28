const { CraftCart, CraftVariant } = require("../../models/relation");
const { buildIncludeModels } = require("../craftVariant/variant.utils");

const findCraftCarts = (condition) => {
  const include = buildIncludeModels(['craft', 'craftGalleries', ]);
  return CraftCart.findAll({
    where: condition,
    include: {
      model: CraftVariant,
      attributes:['id', 'id_craft', 'name', 'price'],
      as:"cartCraft",
      include
    },
  });
};

const findCraftCart = (condition) => {
  return CraftCart.findOne({
    where: condition,
  });
};
const insertCraftCart = (body) => {
  return CraftCart.create(body);
};

const insertBulkCraftCart = (body) => {
  return CraftCart.bulkCreate(body);
};
const editCraftCart = (key, body) => {
  return CraftCart.update(body, {
    where: { craft_variant_id: key.craft_variant_id, user_id: key.user_id },
  });
};

const destroyCraftCart = (key) => {
  return CraftCart.destroy({
    where: { craft_variant_id: key.craft_variant_id, user_id: key.user_id },
  });
};

module.exports = {
  findCraftCart,
  findCraftCarts,
  insertCraftCart,
  editCraftCart,
  destroyCraftCart,
};
