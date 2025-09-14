const imageUpload = require("../../middlewares/imageUploads");
const { GalleryTraditional } = require("../../models/relation");
const { TraditionalHouse } = require("../../models/relation");
const { insertGalleryTraditional } = require("../gallery/gallery.repository");
const fs = require("fs");
const { formatImageUrl } = require("../../utils/formatImageUrl");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const traditionalHouses = await TraditionalHouse.findAll({
      include: [
        {
          model: GalleryTraditional,
          as: "galleries",
        },
      ],
    });
    res.json(traditionalHouses);
  } catch (error) {
    next(error);
  }
});

router.post("/", imageUpload().array("images"), async (req, res, next) => {
  try {
    const { name, address, contact_person, ticket_price, category, min_capacity, open, close, description, status, geom } = req.body;
    const newTraditionalHouse = await TraditionalHouse.create({
      name,
      address,
      contact_person,
      ticket_price,
      category,
      min_capacity,
      open,
      close,
      description,
      status,
      geom: typeof geom !== "object" ? JSON.parse(geom) : geom,
    });
    const images =
      req?.files?.map((file) => ({
        url: formatImageUrl(file.path),
        traditional_house_id: newTraditionalHouse.id,
      })) || [];
    if (images.length > 0) {
      for (const file of images) {
        await insertGalleryTraditional(file);
      }
    }
    res.status(201).json(newTraditionalHouse);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", imageUpload().array("images"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const {  name, address, contact_person, ticket_price, category, min_capacity, open, close, description, status, geom } = req.body;
    const updatedTraditionalHouse = await TraditionalHouse.update(
      {
        name,
        address,
        contact_person,
        ticket_price,
        category,
        min_capacity,
        open,
        close,
        description,
        status,
        geom: typeof geom !== "object" ? JSON.parse(geom) : geom,
      },
      {
        where: { id },
      }
    );
    const existingGalleries = await GalleryTraditional.findAll({
      where: { traditional_house_id: id },
    });

    if (existingGalleries.length > 0) {
      for (const gallery of existingGalleries) {
        fs.unlinkSync(`public/${gallery.url}`);
      }
    }

    await GalleryTraditional.destroy({
      where: { traditional_house_id: id },
    });

    const images =
      req?.files?.map((file) => ({
        url: formatImageUrl(file.path),
        traditional_house_id: id,
      })) || [];

    if (images.length > 0) {
      for (const file of images) {
        await insertGalleryTraditional(file);
      }
    }

    res.json(updatedTraditionalHouse);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await TraditionalHouse.destroy({ where: { id } });
    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
