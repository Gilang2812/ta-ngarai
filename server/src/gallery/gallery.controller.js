const { getGalleryTourisms, getGalleryPackages } = require("./gallery.service");

const router = require("express").Router();

router.get("/tourism", async (req, res) => {
  try {
    const galleryTourism = await getGalleryTourisms();

    res.json(galleryTourism);
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.message || "Internal server error, ");
  }
});

router.get("/package", async (req, res) => {
  try {
    let condition = {};
    req.query.id && (condition.id = req.query.id);
    req.query.custom && (condition.custom = parseInt(req.query.custom));
    // console.log(condition)
    const galleryPackages = await getGalleryPackages(condition);

    res.status(200).json(galleryPackages);
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.messages || error.message || "Internal server error, ");
  }
});

module.exports = router;
