const express = require("express");
const { getAllGeoJSONData, getAllCountry, getAllProvinces, getAllKabKota, getAllKecamatan, getAllVillages } = require("./geo.service");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const geojson = await getAllGeoJSONData();
    res.json(geojson);
  } catch (error) {
    next(error);
  }
});

router.get("/country", async (req, res, next) => {
  try {
    const country = await getAllCountry();
    res.status(200).json(country);
  } catch (error) {
    next(error);
  }
});
router.get("/province", async (req, res, next) => {
  try {
    const province = await getAllProvinces();
    res.status(200).json(province);
  } catch (error) {
    next(error);
  }
});
router.get("/kabkota", async (req, res, next) => {
  try {
    const kabKota = await getAllKabKota();
    res.status(200).json(kabKota);
  } catch (error) {
    next(error);
  }
});
router.get("/kecamatan", async (req, res, next) => {
  try {
    const kecamatan = await getAllKecamatan();
    res.status(200).json(kecamatan);
  } catch (error) {
    next(error);
  }
});

router.get("/village", async (req, res, next) => {
  try {
    const villages = await getAllVillages();
    res.status(200).json(villages);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
