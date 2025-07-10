const {
  findReviewGalleries,
  updateReviewGallery,
  destroyReviewGallery,
  findReviewGallery,
  insertReviewGallery,
} = require("./reviewGallery.repository");

const getReviewGalleries = async (condition) => {
  const reviewGalleries = await findReviewGalleries(condition);
  return reviewGalleries;
};

const getReviewGallery = async (condition) => {
  const reviewGallery = await findReviewGallery(condition);
  if (!reviewGallery) {
    throw new CustomError("Review Gallery not found", 404);
  }
  return reviewGallery;
};

const takeReviewGallery = async (key) => {
  const reviewGallery = await findReviewGallery(key);
  return reviewGallery;
};
const createReviewGallery = async (body) => {
  const newReviewGallery = await insertReviewGallery(body);
  return newReviewGallery;
};
const editReviewGalleryById = async (key, body) => {
  const reviewGallery = await getReviewGallery(key);
  await updateReviewGallery(key, body);
  return reviewGallery;
};
const deleteReviewGalleryById = async (key) => {
  const deletedReviewGallery = await destroyReviewGallery(key);

  return deletedReviewGallery;
};
module.exports = {
  getReviewGalleries,
  getReviewGallery,
  createReviewGallery,
  editReviewGalleryById,
  deleteReviewGalleryById,
  takeReviewGallery,
};
