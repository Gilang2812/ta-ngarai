const ItemCheckoutReviewGallery = require("../../models/ItemCheckoutReviewGalleryModel");

const findReviewGalleries = async (condition={}) => {
  const reviewGalleries = await ItemCheckoutReviewGallery.findAll({where:condition});
  return reviewGalleries;
};

const findReviewGallery = async (condition) => {
  const reviewGallery = await ItemCheckoutReviewGallery.findOne({
    where: condition,
  });
  return reviewGallery;
};

const insertReviewGallery = async (body) => {
  const newReviewGallery = await ItemCheckoutReviewGallery.create(body);
  return newReviewGallery;
};

const updateReviewGallery = async (id, body) => {
  const updatedReviewGallery = await ItemCheckoutReviewGallery.update(body, {
    where: {
      id,
    },
  });
  return updatedReviewGallery;
};

const destroyReviewGallery = async (id) => {
  const deletedReviewGallery = await ItemCheckoutReviewGallery.destroy({
    where: id,
  });
  return deletedReviewGallery;
};

module.exports = {
  findReviewGalleries,
  findReviewGallery,
  insertReviewGallery,
  updateReviewGallery,
  destroyReviewGallery,
};
