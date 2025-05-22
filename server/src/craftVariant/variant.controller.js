const router = require("express").Router();
const imageUpload = require("../../middlewares/imageUploads.js");
const {
  bulkInsertGalleries,
} = require("../craftGalleries/craftGalleries.repository");
const { insertGallery } = require("../craftGalleries/craftGalleries.service");
const { validateData } = require("../middlewares/validation");
const {
  getVariants,
  getVariantById,
  insertVariant,
  updateVariantById,
  deleteVariantById,
} = require("./variant.service");

const { variantSchema } = require("./variant.validation");
router.get("/", async (req, res, next) => {
  try {
    const variants = await getVariants();
    res.status(200).json(variants);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const variant = await getVariantById(id);
    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }
    res.status(200).json(variant);
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  imageUpload.array("images", 5),
  validateData(variantSchema),
  async (req, res, next) => {
    try {
      const { id_craft, name, description, price, modal, stock } = req.body;

      const newVariant = await insertVariant({
        id_craft,
        name,
        description,
        price: Number(price),
        modal: Number(modal),
        stock: Number(stock),
      });
      const images = req.files
        ? req.files.map((file) => ({
            id_craft_variant: newVariant.id,
            url: file.path.split("\\").slice(1).join("/").replaceAll(" ", "-"),
          }))
        : [];

      if (images.length > 0) {
        for (const image of images) {
          await insertGallery(image);
        }
      }
      return res.status(201).json({ newVariant });
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  "/:id",
  imageUpload.array("images"),
  validateData(variantSchema),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log("req.body", req.files);
      const { name, description, id_craft, price, modal, stock } = req.body;
      const updatedVariant = await updateVariantById(id, {
        id_craft,
        name,
        description,
        price,
        modal,
        stock,
      });
      console.log("updatedVariant", updatedVariant);
      res.status(200).json(updatedVariant);
    } catch (error) {
      next(error);
    }
  }
);
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedVariant = await deleteVariantById(id);
    res.status(200).json(deletedVariant);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
