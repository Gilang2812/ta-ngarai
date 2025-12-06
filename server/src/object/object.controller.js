const {
  findAttraction,
  findCulinaryPlace,
  findSouvenirPlace,
  findHomestay,
  findWorshipPlace,
  findTraditionalHouse,
} = require("./object.repository");
const { getObjectById, getObjectAround } = require("./object.service");

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

router.get("/galleries/:object/:id", async (req, res, next) => {
  try {
    const { object, id } = req.params;

    let data = null;
    switch (object) {
      case "attractions":
        data = await findAttraction(id);
        break;
      case "culinary":
        data = await findCulinaryPlace(id);
        break;
      case "souvenirs":
        data = await findSouvenirPlace(id);
        break;
      case "homestay":
        data = await findHomestay(id);
        break;
      case "worship":
        data = await findWorshipPlace(id);
        break;
      case "traditional":
        data = await findTraditionalHouse(id);
        break;
      default:
        data = null;
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/attractions", async (req, res, next) => {
  try {
    const tableName = "attraction";
    const geomless = req.query.geomless === "true";
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

    if (!geomless) {
      columns.push("geom");
    }

    const { lat, long, radius } = req.query;
    const object = await getObjectAround(lat, long, radius, tableName, columns);

    res.status(200).json(object);
  } catch (error) {
    next(error);
  }
});
router.get("/culinary", async (req, res, next) => {
  try {
    const geomless = req.query.geomless === "true";
    const tableName = "culinary_place";
    const columns = [
      "id",
      "name",
      "contact_person",
      "open",
      "close",
      "capacity",
      "description",
      "status",
      "street",
    ];
    if (!geomless) {
      columns.push("geom");
    }
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
      "street",
    ];
    const geomless = req.query.geomless === "true";
    const { lat, long, radius, geo } = req.query;
    if (!geomless) {
      columns.push("geom");
    }
    const object = await getObjectAround(lat, long, radius, tableName, columns);

    res.status(200).json(object);
  } catch (error) {
    next(error);
  }
});
router.get("/souvenirs", async (req, res, next) => {
  try {
    const tableName = "souvenir_place";
    const geomless = req.query.geomless === "true";
    const columns = [
      "id",
      "name",
      "contact_person",
      "open",
      "close",
      "description",
      "status",
      "street",
    ];
    if (!geomless) {
      columns.push("geom");
    }
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

      "ticket_price",
      "category",
      "contact_person",
      "open",
      "close",
      "min_capacity",
      "description",
      "status",
      "video_url",
      "street",
    ];
    const geomless = req.query.geomless === "true";
    if (!geomless) {
      columns.push("geom");
    }
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
      "capacity",
      "description",
      "status",
      "street",
    ];
    const geomless = req.query.geomless === "true";
    if (!geomless) {
      columns.push("geom");
    }
    const { lat, long, radius } = req.query;
    const object = await getObjectAround(lat, long, radius, tableName, columns);

    res.status(200).json(object);
  } catch (error) {
    next(error);
  }
});

router.get("/homestay", async (req, res, next) => {
  try {
    const tableName = "homestay";
    const columns = [
      "id",
      "name",
      "contact_person",
      "open",
      "close",
      "description",
      "status",
      "video_url",
      "street",
    ];
    const geomless = req.query.geomless === "true";
    if (!geomless) {
      columns.push("geom");
    }
    const { lat, long, radius } = req.query;
    const object = await getObjectAround(lat, long, radius, tableName, columns);

    res.status(200).json(object);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
