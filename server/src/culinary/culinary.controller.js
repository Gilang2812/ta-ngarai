const imageUpload = require("../../middlewares/imageUploads");
const { CulinaryPlace, GalleryCulinary } = require("../../models/relation");
const fs = require("fs");
const { insertGalleryCulinary } = require("../gallery/gallery.repository");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const culinaryGallery = await CulinaryPlace.findAll();
    res.json(culinaryGallery);
  } catch (error) {
    next(error);
  }
});

router.post("/", imageUpload().array("image"), async (req, res, next) => {
  try {
    const newCulinaryPlace = await CulinaryPlace.create(req.body);
    res.status(201).json(newCulinaryPlace);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", imageUpload().array("image"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingGalleries = await GalleryCulinary.findAll({
      where: { culinary_place_id: id },
    });
    const updated = await CulinaryPlace.update(req.body, {
      where: { id },
    });

    if (existingGalleries.length > 0) {
      for (const gallery of existingGalleries) {
        fs.unlinkSync(`public/${gallery.url}`);
      }
    }

    await GalleryCulinary.destroy({
      where: { culinary_place_id: id },
    });

    const images = req.files.images.map((file) => ({
      url: file.path,
      worship_place_id: id,
    }));

    if (images.length > 0) {
      for (const file of images) {
        await insertGalleryCulinary(file);
      }
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await CulinaryPlace.destroy({ where: { id } });
    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
