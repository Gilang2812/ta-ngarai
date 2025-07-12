const router = require("express").Router();
const imageUpload = require("../../middlewares/imageUploads");
const { formatImageUrl } = require("../../utils/formatImageUrl");
const { insertGallery } = require("../craftGalleries/craftGalleries.service");
const { validateData } = require("../middlewares/validation");
const {
  getDetailCrafts,
  selectDetailCrafts,
  getDetailCraft,
  createDetailCraft,
  updateDetailCraft,
  deleteDetailCraft,
} = require("./detailCraft.service");
const { detailCraftSchema } = require("./detailCraft.validation");

router.get("/", async (req, res, next) => {
  try {
    const includeKeys = req.query.include?.split(",") || [];
    const detailCrafts = await selectDetailCrafts(includeKeys);
    res.status(200).json(detailCrafts);
  } catch (error) {
    next(error);
  }
});

router.get("/:craft_variant_id/:id_souvenir_place", async (req, res, next) => {
  try {
    const { craft_variant_id, id_souvenir_place } = req.params;
    const detailCraft = await getDetailCraft({
      craft_variant_id,
      id_souvenir_place,
    });
    res.status(200).json(detailCraft);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  imageUpload.array("images"),
  validateData(detailCraftSchema),
  async (req, res, next) => {
    try {
      const { craft_variant_id, price, weight, modal, stock, description } =
        req.body;
      console.log(req.body);
      const id_souvenir_place = "SP006";
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
          id_craft_variant: craft_variant_id,
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
  async (req, res, next) => {
    try {
      const { craft_variant_id, id_souvenir_place } = req.params;
      const updatedDetailCraft = await updateDetailCraft({
        craft_variant_id,
        id_souvenir_place,
        ...req.body,
      });
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
