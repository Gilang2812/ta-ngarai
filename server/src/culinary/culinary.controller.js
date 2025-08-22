const imageUpload = require("../../middlewares/imageUploads");
const { CulinaryPlace, GalleryCulinary } = require("../../models/relation");
const fs = require("fs");
const { insertGalleryCulinary } = require("../gallery/gallery.repository");
const router = require("express").Router();
const { formatImageUrl } = require("../../utils/formatImageUrl");

router.get("/", async (req, res, next) => {
  try {
    const culinaryGallery = await CulinaryPlace.findAll({
      include: [
        {
          model: GalleryCulinary,
          as: "galleries",
        },
      ],
    });
    res.json(culinaryGallery);
  } catch (error) {
    next(error);
  }
});

router.post("/", imageUpload().array("images"), async (req, res, next) => {
  try {
    const {
      name,
      address,
      contact_person,
      open,
      close,
      capacity,
      description,
      status,
      geom,
    } = req.body;
    const newCulinaryPlace = await CulinaryPlace.create({
      name,
      address,
      contact_person,
      open,
      close,
      capacity,
      description,
      status,
      geom: JSON.parse(geom),
    });

    const images =
      req?.files?.map((file) => ({
        url: formatImageUrl(file.path),
        culinary_place_id: newCulinaryPlace.id,
      })) || [];
    console.log("imgages", images);
    if (images.length > 0) {
      for (const file of images) {
        await insertGalleryCulinary(file);
      }
    }

    res.status(201).json(newCulinaryPlace);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", imageUpload().array("images"), async (req, res, next) => {
  try {
    const {
      name,
      address,
      contact_person,
      open,
      close,
      capacity,
      description,
      status,
      geom,
    } = req.body;

    const { id } = req.params;
    const existingGalleries = await GalleryCulinary.findAll({
      where: { culinary_place_id: id },
    });

    console.log("imgages", req.files);

    const updated = await CulinaryPlace.update(
      {
        name,
        address,
        contact_person,
        open,
        close,
        capacity,
        description,
        status,
        geom: JSON.parse(geom),
      },
      {
        where: { id },
      }
    );

    if (existingGalleries?.length > 0) {
      for (const gallery of existingGalleries) {
        fs.unlinkSync(`public/${gallery.url}`);
      }
    }

    await GalleryCulinary.destroy({
      where: { culinary_place_id: id },
    });

    const images =
      req?.files?.map((file) => ({
        url: formatImageUrl(file.path),
        culinary_place_id: id,
      })) || [];
    console.log("imgages", images);

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
