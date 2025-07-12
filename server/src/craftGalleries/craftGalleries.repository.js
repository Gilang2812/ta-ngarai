const { CraftVariantGallery } = require("../../models/relation");

const findGalleries = async (db, { limit, offset }) => {
  const craftGalleries = await CraftVariantGallery.findAll();
  return craftGalleries;
};
const findGallery = async (condition) => {
  const craftGallery = await CraftVariantGallery.findOne({
    where: condition,
  });
  return craftGallery;
};
const createGallery = async (body) => {
  const newCraftGallery = await CraftVariantGallery.create(body);
  return newCraftGallery;
};
const updateGallery = async (id, body) => {
  const updatedCraftGallery = await CraftVariantGallery.update(body, {
    where: {
      id,
    },
  });
  return updatedCraftGallery;
};
const deleteGallery = async (id) => {
  const deletedCraftGallery = await CraftVariantGallery.destroy({
    where: id,
  });
  return deletedCraftGallery;
};

const bulkCreateGalleries = async (galleries) => {
  const newGalleries = await CraftVariantGallery.bulkCreate(galleries);
  return newGalleries;
};

module.exports = {
  findGalleries,
  findGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  bulkCreateGalleries,
};
