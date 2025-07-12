const {
  Craft,
  CraftVariantGallery,
  ItemCheckout,
  ItemCheckoutReviewGallery,
} = require("../../models/relation");

const includeMap = {
  craft: { model: Craft, as: "craft" }, 
};
   
const buildIncludeModels = (include = []) => {
  return include
    .filter((key) => key in includeMap)
    .map((key) => includeMap[key]);
};

module.exports = { buildIncludeModels };
