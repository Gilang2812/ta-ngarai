const router = require("express").Router();

const {
  getAllHomestay,
  getHomestay,
  createHomestay,
  deleteHomestay,
  editHomestay,
  getUnitHomestays,
  getAllUnitHomestays,
} = require("./homestay.service");
const { handleInput } = require("../../utils/handleInput");
const { homestaySchema } = require("./homestay.validation");
const imageUpload = require("../../middlewares/imageUploads");
const { formatImageUrl } = require("../../utils/formatImageUrl");
const { createGalleryHomestay } = require("../gallery/gallery.service");

router.get("/", async (req, res, next) => {
  try {
    const homestays = await getAllHomestay();
    res.json(200, homestays);
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.message || "Internal server error, ");
  }
});

router.get("/units", async (req, res, next) => {
  try {
    let checkIn = req.query.checkIn;
    if (!checkIn || checkIn === "") {
      return res.status(404).json({ message: "query checkIn is required" });
    }

    const newCheckIn = new Date(checkIn).toISOString().split("T")[0];
    console.log(newCheckIn);
    const units = await getUnitHomestays(newCheckIn);
    res.status(200).json(units);
  } catch (error) {
    next(error);
  }
});

router.get("/units/:homestay_id", async (req, res, next) => {
  try {
    const { homestay_id } = req.params;
    const units = await getAllUnitHomestays({ homestay_id });
    res.status(200).json(units);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  imageUpload("public/images").array("images"),
  async (req, res, next) => {
    try {
      const { name, address, open, close, contact_person, geom } = req.body;
      req.body.geom = req.body.geom;
      console.log(geom);
      const newHomestay = await createHomestay({
        name,
        address,
        open,
        close,
        contact_person,
        geom,
      });

      if (req.files && req.files.length > 0) {
        const images = req.files.map((file) => ({
          url: formatImageUrl(file.path),
          homestay_id: newHomestay.id,
        }));
        for (const image of images) {
          await createGalleryHomestay(image);
        }
      }
      res.status(201).json(newHomestay);
    } catch (error) {
      next(error);
    }
  }
);
router.get("/:id", async (req, res, next) => {
  try {
    const homestay = await getHomestay(req.params.id);
    res.status(200).json(homestay);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const body = req.body || {};
    body.id = req.params.id;
    body.geom = JSON.parse(body.geom);
    const homestay = await editHomestay(body);

    res.status(200).json(homestay);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedHomestay = await deleteHomestay(id);
    res.status(200).json(deletedHomestay);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
