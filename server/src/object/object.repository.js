const sequelize = require("../../config/database");
const { Attraction } = require("../../models/Attraction");
const CulinaryPlace = require("../../models/CulinaryPlace");
const { Facility } = require("../../models/Facility");
const { SouvenirPlace } = require("../../models/SouvenirPlace");
const { TraditionalHouse } = require("../../models/TraditionalHouse");
const { WorshipPlace } = require("../../models/WorshipPlace");
const {
  generateDistanceQuery,
  generateDistanceLessQuery,
} = require("../../utils/generateDistanceQuery");

const objectList = {
  CP: CulinaryPlace,
  TH: TraditionalHouse,
  A: Attraction,
  SP: SouvenirPlace,
  WO: WorshipPlace,
  FC: Facility,
};

const findObjects = async (key, id) => {
  const object = await objectList[key].findOne({ where: id });
  return object;
};

const findObjectAround = async (lat, long, radius, tableName, columns) => {
  const radiusKm = parseFloat(radius) / 1000;
  let query,
    replacements = {};
  if (lat && lat != 0 && long && long != 0 && radius && radius != 0) {
    query = generateDistanceQuery({
      tableName,
      columns,
    });
    replacements = { lat, long, radiusKm };
  } else {
    query = generateDistanceLessQuery({
      tableName,
      columns,
    });
  }
  let [objects] = await sequelize.query(query, {
    replacements,
  });
  if (tableName === "facility") {
    objects = objects.map((item) => {
      const { type, geom, ...rest } = item;
      return { ...rest, type: { id: item.type_id, type: item.type }, geom };
    });
  }

  return objects;
};
module.exports = { findObjects, findObjectAround };
