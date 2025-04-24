const { handleInput } = require("../../utils/handleInput");
const { getObjectById, getObjectAround } = require("./object.service");
const { objectSchema } = require("./object.validation");

const router = require("express").Router();

router.get("/:object/:id", async (req, res, next) => {
  try {
    const { object, id } = req.params;
    const objects = await getObjectById(object, id);

    res.status(200).json(objects);
  } catch (error) {
    next(error);
  }
});

router.get("/attractions", async (req, res, next) => {
  try {
    const tableName = "attraction";
    const columns = [
      "id",
      "name",
      "type",
      "price",
      "category",
      "min_capacity",
      "description",
      "video_url",
    ];
    const { lat, long, radius } = req.query;
    const object = await getObjectAround(lat, long, radius, tableName, columns);

    res.status(200).json(object);
  } catch (error) {
    next(error);
  }
});
router.get("/culinary", async (req, res, next) => {
  try {
    const tableName = "culinary_place";
    const columns = [
      "id",
      "name",
      "address",
      "contact_person",
      "open",
      "close",
      "capacity",
      "description",
      "status",
    ];
    const { lat, long, radius } = req.query;
    const object = await getObjectAround(lat, long, radius, tableName, columns);

    res.status(200).json(object);
  } catch (error) {
    next(error);
  }
});
router.get("/facilities", async (req, res, next) => {
  try {
    const tableName = "facility";
    const columns = [
      "id",
      "name",
      "type_id",
      "category",
      "price",
      "min_capacity",
    ];
    const { lat, long, radius } = req.query;
    const object = await getObjectAround(lat, long, radius, tableName, columns);

    res.status(200).json(object);
  } catch (error) {
    next(error);
  }
});
router.get("/souvenirs", async (req, res, next) => {
  try {
    const tableName = "souvenir_place";
    const columns = [
      "id",
      "name",
      "address",
      "contact_person",
      "open",
      "close",
      "description",
      "status",
    ];
    const { lat, long, radius } = req.query;
    const object = await getObjectAround(lat, long, radius, tableName, columns);

    res.status(200).json(object);
  } catch (error) {
    next(error);
  }
});
router.get("/traditional", async (req, res, next) => {
  try {
    const tableName = "traditional_house";
    const columns = [
      "id",
      "name",
      "address",
      "ticket_price",
      "category",
      "contact_person",
      "open",
      "close",
      "min_capacity",
      "description",
      "status",
      "video_url",
    ];
    const { lat, long, radius } = req.query;
    const object = await getObjectAround(lat, long, radius, tableName, columns);

    res.status(200).json(object);
  } catch (error) {
    next(error);
  }
});
router.get("/worship", async (req, res, next) => {
  try {
    const tableName = "worship_place";
    const columns = [
      "id",
      "name",
      "address",
      "capacity",
      "description",
      "status",
    ];
    const { lat, long, radius } = req.query;
    const object = await getObjectAround(lat, long, radius, tableName, columns);

    res.status(200).json(object);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
