const imageUpload = require("../../middlewares/imageUploads");
const { Attraction, GalleryAttraction } = require("../../models/relation");
const { insertGalleryAttraction } = require("../gallery/gallery.repository");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const attractions = await Attraction.findAll();
    res.json(attractions);
  } catch (error) {
    next(error);
  }
});

router.post("/", imageUpload().array("images"), async (req, res, next) => {
  try {
    const newAttraction = await Attraction.create(req.body);

    const images =
      req?.files?.map((file) => ({
        url: file.path,
        attraction_id: newAttraction.id,
      })) || [];

    if (images.length > 0) {
      for (const file of images) {
        await insertGalleryAttraction(file);
      }
    }
    res.status(201).json(newAttraction);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", imageUpload().array("images"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedAttraction = await Attraction.findOne({
      where: { id },
    });

    const existingGalleries = await GalleryAttraction.findAll({
      where: { attraction_id: id },
    });

    if (existingGalleries.length > 0) {
      for (const gallery of existingGalleries) {
        fs.unlinkSync(`public/${gallery.url}`);
      }
    }
    await GalleryAttraction.destroy({
      where: { attraction_id: id },
    });

    await Attraction.update(req.body, {
      where: { id },
    });

    const images =
      req?.files?.map((file) => ({
        url: file.path,
        attraction_id: updatedAttraction.id,
      })) || [];

    if (images.length > 0) {
      for (const file of images) {
        await insertGalleryAttraction(file);
      }
    }
    res.json(updatedAttraction[1][0]);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Attraction.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
