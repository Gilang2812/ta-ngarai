const { and, where, col } = require("sequelize");
const {
  CraftVariant,
  ItemCheckout,
  Checkout,
  DetailMarketplaceCraft,
  CraftVariantGallery,
} = require("../../models/relation");
const {
  buildIncludeModels,
} = require("../detailMarketplaceCraft/detailCraft.utils");

const findCraftCarts = (condition) => {
  const include = buildIncludeModels(["craft"]);
  return ItemCheckout.findAll({
    attributes: [
      "checkout_id",
      "craft_variant_id",
      "id_souvenir_place",
      "jumlah",
    ],
    include: [
      {
        model: Checkout,
        as: "checkout",
        where: {
          customer_id: condition.customer_id,
          checkout_date: null,
        },
        attributes: ["id", "address_id", "customer_id"],
      },
      {
        model: DetailMarketplaceCraft,
        as: "detailCraft",
        where:and(
          where(
            col("ItemCheckout.craft_variant_id"),
            col("detailCraft.craft_variant_id")
          ),
          where(
            col("ItemCheckout.id_souvenir_place"),
            col("detailCraft.id_souvenir_place")
          )
        ),
        include: [
          ...include,
          {
            model: CraftVariantGallery,
            as: "craftGalleries",
            attributes: ["id", "craft_variant_id", "id_souvenir_place", "url"],
            where: and(
              where(
                col("detailCraft->craftGalleries.craft_variant_id"),
                col("detailCraft.craft_variant_id")
              ),
              where(
                col("detailCraft->craftGalleries.id_souvenir_place"),
                col("detailCraft.id_souvenir_place")
              )
            ),
            required: false,
          },
        ],
      },
    ],
  });
};

const findCraftCart = (condition) => {
  return ItemCheckout.findOne({
    where: condition,
  });
};
const insertCraftCart = (body) => {
  return ItemCheckout.create(body);
};

const insertBulkCraftCart = (body) => {
  return ItemCheckout.bulkCreate(body);
};
const editCraftCart = (key, body) => {
  return ItemCheckout.update(body, {
    where: key,
  });
};

const destroyCraftCart = (key) => {
  return ItemCheckout.destroy({
    where: key,
  });
};

module.exports = {
  findCraftCart,
  findCraftCarts,
  insertCraftCart,
  editCraftCart,
  destroyCraftCart,
  insertBulkCraftCart,
};
