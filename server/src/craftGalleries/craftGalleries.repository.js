const { CraftVariantGallery } = require("../../models/relation");

const findGalleries = async (db, { limit, offset }) => {
  const craftGalleries = await CraftVariantGallery.findAll();
  return craftGalleries;
};
const findGalleryById = async (id) => {
  const craftGallery = await CraftVariantGallery.findOne({
    where: {
      id: id,
    },
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
    where: {
      id,
    },
  });
  return deletedCraftGallery;
};

const bulkInsertGalleries = async (galleries) => {
  const newGalleries = await CraftVariantGallery.bulkCreate(galleries);
  return newGalleries;
};

module.exports = {
  findGalleries,
  findGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
  bulkInsertGalleries,  
};
