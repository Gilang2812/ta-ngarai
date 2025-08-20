const imageUpload = require("../../middlewares/imageUploads");
const { CulinaryPlace, GalleryWorship } = require("../../models/relation");
const { WorshipPlace } = require("../../models/relation");
const { insertGalleryWorship } = require("../gallery/gallery.repository");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const worshipGallery = await WorshipPlace.findAll();
    res.json(worshipGallery);
  } catch (error) {
    next(error);
  }
});

router.post("/", imageUpload().array("image"), async (req, res, next) => {
  try {
    const newWorshipPlace = await WorshipPlace.create(req.body);
    res.status(201).json(newWorshipPlace);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", imageUpload().array("image"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedWorshipPlace = await WorshipPlace.update(req.body, {
      where: { id },
    });
    const existingGalleries = await GalleryWorship.findAll({
      where: { worship_place_id: id },
    });

    if (existingGalleries.length > 0) {
      for (const gallery of existingGalleries) {
        fs.unlinkSync(`public/${gallery.url}`);
      }
    }

    await GalleryWorship.destroy({
      where: { worship_place_id: id },
    });

    const images = req.files.images.map((file) => ({
      url: file.path,
      worship_place_id: id,
    }));

    if (images.length > 0) {
      for (const file of images) {
        await insertGalleryWorship(file);
      }
    }

    res.json(updatedWorshipPlace);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await WorshipPlace.destroy({ where: { id } });
    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
