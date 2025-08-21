const imageUpload = require("../../middlewares/imageUploads");
const { Attraction, GalleryAttraction } = require("../../models/relation");
const { formatImageUrl } = require("../../utils/formatImageUrl");
const { insertGalleryAttraction } = require("../gallery/gallery.repository");
const fs = require("fs");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const attractions = await Attraction.findAll({
      include: [
        {
          model: GalleryAttraction,
          as: "galleries",
        },
      ],
    });
    res.json(attractions);
  } catch (error) {
    next(error);
  }
});

router.post("/", imageUpload().array("images"), async (req, res, next) => {
  try {
    const {
      name,
      type,
      price,
      category,
      min_capacity,
      description,
      video_url,
      geom,
    } = req.body;
    const newAttraction = await Attraction.create({
      name,
      type,
      price,
      category,
      min_capacity,
      description,
      video_url,
      geom: JSON.parse(geom),
    });

    const images =
      req?.files?.map((file) => ({
        url: formatImageUrl(file.path),
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
    const {
      name,
      type,
      price,
      category,
      min_capacity,
      description,
      video_url,
      geom,
    } = req.body;
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

    await Attraction.update(
      {
        name,
        type,
        price,
        category,
        min_capacity,
        description,
        video_url,
        geom: JSON.parse(geom),
      },
      {
        where: { id },
      }
    );

    const images =
      req?.files?.map((file) => ({
        url: formatImageUrl(file.path),

        attraction_id: updatedAttraction.id,
      })) || [];

    if (images.length > 0) {
      for (const file of images) {
        await insertGalleryAttraction(file);
      }
    }
    res.json(updatedAttraction);
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
