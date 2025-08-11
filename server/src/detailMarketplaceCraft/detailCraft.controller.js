const router = require("express").Router();
const imageUpload = require("../../middlewares/imageUploads");
const { formatImageUrl } = require("../../utils/formatImageUrl");
const {
  insertGallery,
  deleteGalleryByAtribut,
} = require("../craftGalleries/craftGalleries.service");
const { validateData } = require("../middlewares/validation");
const {
  getDetailCrafts,
  selectDetailCrafts,
  getDetailCraft,
  createDetailCraft,
  updateDetailCraft,
  deleteDetailCraft,
  getOrderDetailCraft,
} = require("./detailCraft.service");
const { detailCraftSchema } = require("./detailCraft.validation");
const fs = require("fs");

router.get("/", async (req, res, next) => {
  try {
    const includeKeys = req.query.include?.split(",") || [];

    const condition = { id_souvenir_place: req.user.id_souvenir_place }; // Default value, can be modified as needed
    let detailCrafts = [];
    if (req.user.id_souvenir_place) {
      detailCrafts = await getDetailCrafts(condition, includeKeys);
    }
    res.status(200).json(detailCrafts);
  } catch (error) {
    next(error);
  }
});
router.get("/users", async (req, res, next) => {
  try {
    const includeKeys = req.query.include?.split(",") || [];
    const detailCrafts = await getDetailCrafts({}, includeKeys);
    res.status(200).json(detailCrafts);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/detail/:craft_variant_id/:id_souvenir_place",
  async (req, res, next) => {
    try {
      const { craft_variant_id, id_souvenir_place } = req.params;
      const includeKeys = req.query.include?.split(",") || [];
      const detailCraft = await getDetailCraft(
        {
          craft_variant_id,
          id_souvenir_place,
        },
        includeKeys
      );
      res.status(200).json(detailCraft);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/order/:id_craft/:id_souvenir_place", async (req, res, next) => {
  try {
    const { id_craft, id_souvenir_place } = req.params;
    const detailCraft = await getOrderDetailCraft({
      id_craft,
      id_souvenir_place,
    });
    res.status(200).json(detailCraft);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  imageUpload().array("images"),
  validateData(detailCraftSchema),
  async (req, res, next) => {
    try {
      const { craft_variant_id, price, weight, modal, stock, description } =
        req.body;
      const id_souvenir_place = req.user.id_souvenir_place;
      const newDetailCraft = await createDetailCraft({
        craft_variant_id,
        id_souvenir_place,
        price,
        weight,
        modal,
        stock,
        description,
      });

      const images =
        req.files?.map((file) => ({
          craft_variant_id,
          id_souvenir_place,
          url: formatImageUrl(file.path),
        })) ?? [];

      if (images.length > 0) {
        for (const image of images) {
          await insertGallery(image);
        }
      }

      res.status(201).json(newDetailCraft);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:craft_variant_id/:id_souvenir_place",
  imageUpload().array("images"),
  validateData(detailCraftSchema),
  async (req, res, next) => {
    try {
      const { craft_variant_id, id_souvenir_place } = req.params;
      const { price, weight, modal, stock, description, isNewImage } = req.body;
      const updatedDetailCraft = await updateDetailCraft(
        {
          craft_variant_id,
          id_souvenir_place,
        },
        {
          price,
          weight,
          modal,
          stock,
          description,
        }
      );
      const existingGalleries = updatedDetailCraft.craftGalleries || [];
      if (!isNewImage) {
        console.log("new galerry", isNewImage);
        for (const image of req.files) {
          fs.unlinkSync(image.path);
        }
      } else {
        const images = req.files
          ? req.files.map((file) => ({
              craft_variant_id,
              id_souvenir_place,
              url: formatImageUrl(file.path),
            }))
          : [];
        for (const image of existingGalleries) {
          fs.unlinkSync(`public\\${image.url}`);
        }
        await deleteGalleryByAtribut({ craft_variant_id, id_souvenir_place });
        for (const image of images) {
          await insertGallery(image);
        }
      }
      res.status(200).json(updatedDetailCraft);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:craft_variant_id/:id_souvenir_place",
  async (req, res, next) => {
    try {
      const { craft_variant_id, id_souvenir_place } = req.params;
      const deletedDetailCraft = await deleteDetailCraft({
        craft_variant_id,
        id_souvenir_place,
      });
      res.status(204).json(deletedDetailCraft);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
