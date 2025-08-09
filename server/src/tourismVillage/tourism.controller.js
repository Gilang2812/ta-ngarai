const fs = require("fs");
const path = require("path");
const { TourismVillage } = require("../../models/TourismVillageModel"); 
const { getTourismById, editTourismById } = require("./tourism.service");
const router = require("express").Router();
 
const imageUpload = require("../../middlewares/imageUploads");

router.get("/:id",  async (req, res) => {
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

router.patch("/:id", imageUpload.fields([
  { name: "qr_url", maxCount: 1 },
  { name: "images", maxCount: 5 }
]), async (req, res) => {
  try {
    const id = req.params.id;
    const requestData = {
      id: id,
      name: req.body?.name,
      type_of_tourism: req.body?.type_of_tourism,
      address: req.body?.address,
      province_id: req.body?.province_id,
      open: req.body?.open,
      close: req.body?.close,
      ticket_price: req.body?.ticket_price,
      contact_person: req.body?.contact_person,
      description: req.body?.description,
      geom: req.body?.geom,
      lat: req.body?.lat,
      lng: req.body?.lng,
      bank_name: req.body?.bank_name,
      bank_code: req.body?.bank_code,
      bank_account_holder: req.body?.bank_account_holder,
      bank_account_number: req.body?.bank_account_number,
      qr_url: req.body?.qr_url,
    };

    // Hapus field yang kosong
    Object.keys(requestData).forEach((key) => {
      if (!requestData[key]) delete requestData[key];
    });

    // Tangani QR code jika ada
    if (req.body.qr) {
      const folder = req.body.qr;
      const filepath = path.join(__dirname, "../uploads", folder);
      const files = fs.readdirSync(filepath);
      const qrFile = path.join(filepath, files[0]);

      fs.renameSync(
        qrFile,
        path.join(__dirname, "../media/photos/sumpu", path.basename(qrFile))
      );
      fs.rmSync(filepath, { recursive: true, force: true });
      requestData.qr_url = path.basename(qrFile);
    }
    const image = req.file;
    // Update data utama
    await TourismVillage.update(requestData, { where: { id } });

    res.status(200).json({ message: req.body });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.message || "Internal server error");
  }
});

module.exports = router;
