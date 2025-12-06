const { col, where, and } = require("sequelize");
const {
  Craft,
  CraftVariantGallery,
  ItemCheckout,
  ItemCheckoutReviewGallery,
  CraftVariant,
  SouvenirPlace,
  Location,
} = require("../../models/relation");

const includeMap = {
  craft: {
    model: CraftVariant,
    as: "variant",
    attributes: ["id", "id_craft", "name"],
    include: [{ model: Craft, as: "craft", attributes: ["id", "name"] }],
  },
  craftGalleries: {
    model: CraftVariantGallery,
    as: "craftGalleries",
    attributes: ["id", "craft_variant_id", "id_souvenir_place", "url"],
    where: and(
      where(
        col("craftGalleries.craft_variant_id"),
        col("DetailMarketplaceCraft.craft_variant_id")
      ),
      where(
        col("craftGalleries.id_souvenir_place"),
        col("DetailMarketplaceCraft.id_souvenir_place")
      )
    ),
    required: false,
  },
  souvenirPlace: {
    model: SouvenirPlace,
    as: "souvenirPlace",
    attributes: ["id", "name", "contact_person"],
    include: [
      {
        model: Location,
        as: "location",
      },
    ],
  },

  checkout: {
    model: ItemCheckout,
    as: "items",
  },
  reviewGalleries: {
    model: ItemCheckout,
    as: "items",
    attributes: [
      "checkout_id",
      "craft_variant_id",
      "id_souvenir_place",
      "shipping_id",
      "jumlah",
    ],
    include: [
      {
        model: ItemCheckoutReviewGallery,
        as: "reviewGalleries",
        attributes: ["id", "item_checkout_id", "url"],
      },
    ],
  },
};

const buildIncludeModels = (include = []) => {
  return include
    .filter((key) => key in includeMap)
    .map((key) => includeMap[key]);
};

module.exports = { buildIncludeModels };
