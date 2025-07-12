const {
  Craft,
  CraftVariantGallery,
  ItemCheckout,
  ItemCheckoutReviewGallery,
  CraftVariant,
} = require("../../models/relation");

const includeMap = {
  craft: { model: CraftVariant, as: "variants" }, 
};
   
const buildIncludeModels = (include = []) => {
  return include
    .filter((key) => key in includeMap)
    .map((key) => includeMap[key]);
};

module.exports = { buildIncludeModels };
