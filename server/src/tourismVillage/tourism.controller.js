const fs = require("fs");
const {
  getTourismById,
  editTourismById,
  createTourismGallery,
  deleteTourismGallery,
  getDepositPercentage,
} = require("./tourism.service");
const router = require("express").Router();

const imageUpload = require("../../middlewares/imageUploads");
const { formatImageUrl } = require("../../utils/formatImageUrl");
const { deleteGalleryByAtribut } = require("./tourism.repository");
const { getLocation } = require("../location/location.repository");
const { unlinkSync } = require("../../utils/unlinkSync");

router.get("/:id", async (req, res) => {
  try {
    const tourism = await getTourismById(req.params.id);
    return res.status(200).json(tourism);
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.message || "Internal server error");
  }
});

router.get("/:id/deposit-percentage", async (req, res) => {
  try {
    const percentage = await getDepositPercentage(req.params.id);
    return res.status(200).json({ deposit_percentage: percentage });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.message || "Internal server error");
  }
});

router.patch(
  "/:id",
  imageUpload().fields([
    { name: "qr_url", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const id = req.params.id;
      let {
        name,
        type_of_tourism,
        country,
        province,
        regency,
        district,
        village,
        postal_code,
        open,
        close,
        ticket_price,
        contact_person,
        description,
        deposit_percentage,
        geom,
        lat,
        lng,
        bank_name,
        bank_code,
        bank_account_holder,
        bank_account_number,
      } = req.body;
      const qr_url = req?.files?.qr_url
        ? formatImageUrl(req?.files?.qr_url?.[0].path)
        : "";

      const location = await getLocation({
        country,
        province,
        regency,
        district,
        village,
        postal_code,
      });
      const updatedTourism = await editTourismById(id, {
        name,
        type_of_tourism,
        location_id: location.id,
        open,
        close,
        ticket_price,
        contact_person,
        description,
        deposit_percentage,
        geom,
        lat,
        lng,
        qr_url,
        bank_name,
        bank_code,
        bank_account_holder,
        bank_account_number,
      });

      if (updatedTourism.qr_url) {
        unlinkSync(`public\\${updatedTourism.qr_url}`);
      }
      const existingGalleries = updatedTourism.galleries || [];
      for (const image of existingGalleries) {
        unlinkSync(`public\\${image.url}`);
      }
      await deleteTourismGallery({ tourism_village_id: id });
      console.log(updatedTourism);

      const images = req?.files?.images
        ? req?.files?.images?.map((file) => ({
            tourism_village_id: id,
            url: formatImageUrl(file.path),
          }))
        : [];

      if (images.length > 0) {
        for (const image of images) {
          // Save each image to the database
          await createTourismGallery(image);
        }
      }

      res.status(200).json({ message: req.body, images });
    } catch (error) {
      console.error(error);
      res
        .status(error.statusCode || 500)
        .json(error.message || "Internal server error");
    }
  }
);

module.exports = router;
