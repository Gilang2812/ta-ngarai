const router = require("express").Router();
const imageUpload = require("../../middlewares/imageUploads.js");
const {
  bulkInsertGalleries,
} = require("../craftGalleries/craftGalleries.repository");
const {
  insertGallery,
  deleteGalleryByAtribut,
} = require("../craftGalleries/craftGalleries.service");
const { validateData } = require("../middlewares/validation");
const {
  getVariants,
  getVariantById,
  insertVariant,
  updateVariantById,
  deleteVariantById,
} = require("./variant.service");
const fs = require("fs");

const { variantSchema } = require("./variant.validation");
const { formatImageUrl } = require("../../utils/formatImageUrl.js");
router.get("/", async (req, res, next) => {
  try {
    const includeKeys = req.query.include?.split(",") || [];

    const variants = await getVariants(includeKeys);

    res.status(200).json(variants);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const includeKeys = req.query.include?.split(",") || [];

    const variant = await getVariantById(id, includeKeys);
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
      const { id_craft, name, description, price, weight, modal, stock } = req.body;

      const newVariant = await insertVariant({
        id_craft,
        name,
        description,
        price: Number(price),
        weight: Number(weight),
        modal: Number(modal),
        stock: Number(stock),
      });
      const images = req.files
        ? req.files.map((file) => ({
            id_craft_variant: newVariant.id,
            url: formatImageUrl(file.path),
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
      console.log("req.file", req.files);
      console.log("req.body", req.body);
      const { name, description, id_craft, price, weight, modal, stock, isNewImage } =
        req.body;

      const updatedVariant = await updateVariantById(id, {
        id_craft,
        name,
        description,
        price,
        weight,
        modal,
        stock,
      });
      const existingGalleries = updatedVariant.craftGalleries || [];
      if (!isNewImage) {
        console.log("new galerry", isNewImage);
        for (const image of req.files) {
          fs.unlinkSync(image.path);
        }
      } else {
        const images = req.files
          ? req.files.map((file) => ({
              id_craft_variant: id,
              url: formatImageUrl(file.path),
            }))
          : [];
        for (const image of existingGalleries) {
          fs.unlinkSync(`public\\${image.url}`);
        }
        await deleteGalleryByAtribut({ id_craft_variant: id });
        for (const image of images) {
          await insertGallery(image);
        }
      }
      console.log("updatedVariant", updatedVariant.craftGalleries);
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
