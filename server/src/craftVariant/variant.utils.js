const {
  Craft,
  CraftVariantGallery,
  ItemCheckout,
  ItemCheckoutReviewGallery,
} = require("../../models/relation");

const includeMap = {
  craft: { model: Craft, as: "craft" },
  craftGalleries: { model: CraftVariantGallery, as: "craftGalleries" },
  checkout: { model: ItemCheckout, as: "itemCheckouts" },
  reviewGalleries: {
    model: ItemCheckout,
    as: "itemCheckouts",
    include: [{ model: ItemCheckoutReviewGallery, as: "reviewGalleries" }],
  },
};

const buildIncludeModels = (include = []) => {
  return include
    .filter((key) => key in includeMap)
    .map((key) => includeMap[key]);
};

module.exports = { buildIncludeModels };
