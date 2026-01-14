const imageUpload = require("../../middlewares/imageUploads");
const { GalleryWorship } = require("../../models/relation");
const { WorshipPlace } = require("../../models/relation");
const { insertGalleryWorship } = require("../gallery/gallery.repository");
const fs = require("fs");
const { formatImageUrl } = require("../../utils/formatImageUrl");
const { getLocation } = require("../location/location.repository");
const { unlinkSync } = require("../../utils/unlinkSync");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const worshipGallery = await WorshipPlace.findAll({
      include: [
        {
          model: GalleryWorship,
          as: "galleries",
        },
      ],
    });
    res.json(worshipGallery);
  } catch (error) {
    next(error);
  }
});

router.post("/", imageUpload().array("images"), async (req, res, next) => {
  try {
    const {
      name,
      country,
      province,
      regency,
      district,
      postal_code,
      village,
      street,
      capacity,
      description,
      status,
      geom,
    } = req.body;

    const location = await getLocation({
      country,
      province,
      regency,
      district,
      postal_code,
      village,
    });

    const newWorshipPlace = await WorshipPlace.create({
      name,
      location_id: location.id,
      street,
      capacity,
      description,
      status,
      geom: typeof geom !== "object" ? JSON.parse(geom) : geom,
    });
    const images =
      req?.files?.map((file) => ({
        url: formatImageUrl(file.path),
        worship_place_id: newWorshipPlace.id,
      })) || [];
    if (images.length > 0) {
      for (const file of images) {
        await insertGalleryWorship(file);
      }
    }
    res.status(201).json(newWorshipPlace);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", imageUpload().array("images"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      country,
      province,
      regency,
      district,
      postal_code,
      village,
      street,
      capacity,
      description,
      status,
      geom,
    } = req.body;

    const location = await getLocation({
      country,
      province,
      regency,
      district,
      postal_code,
      village,
    });
    const updatedWorshipPlace = await WorshipPlace.update(
      {
        name,
        location_id: location.id,
        street,
        capacity,
        description,
        status,
        geom: typeof geom !== "object" ? JSON.parse(geom) : geom,
      },
      {
        where: { id },
      }
    );
    const existingGalleries = await GalleryWorship.findAll({
      where: { worship_place_id: id },
    });

    if (existingGalleries.length > 0) {
      for (const gallery of existingGalleries) {
        unlinkSync(`public/${gallery.url}`);
      }
    }

    await GalleryWorship.destroy({
      where: { worship_place_id: id },
    });

    const images =
      req?.files?.map((file) => ({
        url: formatImageUrl(file.path),

        worship_place_id: id,
      })) || [];

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
