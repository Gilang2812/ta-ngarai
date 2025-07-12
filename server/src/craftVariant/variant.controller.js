const router = require("express").Router();
const {
  getVariants,
  getVariantById,
  insertVariant,
  updateVariantById,
  deleteVariantById,
} = require("./variant.service");
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
router.post("/", async (req, res, next) => {
  try {
    const { id_craft, name } = req.body;

    const newVariant = await insertVariant({
      id_craft,
      name,
    });

    return res.status(201).json(newVariant);
  } catch (error) {
    next(error);
  }
});
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, id_craft } = req.body;

    const updatedVariant = await updateVariantById(id, {
      id_craft,
      name,
    });

    res.status(200).json(updatedVariant);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedVariant = await deleteVariantById(id);
    res.status(200).json(deletedVariant);
  } catch (error) {
    next(error);
  }
});

// router.patch(
//   "/:id",
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const {
//         name,
//         description,
//         id_craft,
//         price,
//         weight,
//         modal,
//         stock,
//         isNewImage,
//       } = req.body;

//       const updatedVariant = await updateVariantById(id, {
//         id_craft,
//         name,
//         description,
//         price,
//         weight,
//         modal,
//         stock,
//       });
//       const existingGalleries = updatedVariant.craftGalleries || [];
//       if (!isNewImage) {
//         console.log("new galerry", isNewImage);
//         for (const image of req.files) {
//           fs.unlinkSync(image.path);
//         }
//       } else {
//         const images = req.files
//           ? req.files.map((file) => ({
//               id_craft_variant: id,
//               url: formatImageUrl(file.path),
//             }))
//           : [];
//         for (const image of existingGalleries) {
//           fs.unlinkSync(`public\\${image.url}`);
//         }
//         await deleteGalleryByAtribut({ id_craft_variant: id });
//         for (const image of images) {
//           await insertGallery(image);
//         }
//       }
//       console.log("updatedVariant", updatedVariant.craftGalleries);
//       res.status(200).json(updatedVariant);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
module.exports = router;
