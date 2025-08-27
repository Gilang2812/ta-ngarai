const sequelize = require("../../config/database");
const {
  Attraction,
  CulinaryPlace,
  Facility,
  GalleryAttraction,
  GalleryCulinary,
  SouvenirPlace,
  WorshipPlace,
  Homestay,
  GalleryWorship,
  GallerySouvenir,
} = require("../../models/relation");
const { TraditionalHouse } = require("../../models/TraditionalHouse");

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

const findAllObjects = async (key) => {
  const objects = await objectList[key].findAll();
  return objects;
};

const findObjects = async (key, id) => {
  const object = await objectList[key]?.findOne({ where: id });
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

const findAttraction = async (id) => {
  const attraction = await Attraction.findOne({
    where: { id },
    include: [
      {
        model: GalleryAttraction,
        as: "galleries",
      },
    ],
  });
  return attraction;
};

const findCulinaryPlace = async (id) => {
  const culinaryPlace = await CulinaryPlace.findOne({
    where: { id },
    include: [
      {
        model: GalleryCulinary,
        as: "galleries",
      },
    ],
  });
  return culinaryPlace;
};

const findSouvenirPlace = async (id) => {
  const souvenirPlace = await SouvenirPlace.findOne({
    where: { id },
    include: [
      {
        model: GallerySouvenir,
        as: "galleries",
      },
    ],
  });
  return souvenirPlace;
};

const findHomestay = async (id) => {
  const homestay = await Homestay.findOne({
    where: { id },
    include: [
      {
        model: GalleryHomestay,
        as: "galleries",
      },
    ],
  });
  return homestay;
};

const findWorshipPlace = async (id) => {
  const worshipPlace = await WorshipPlace.findOne({
    where: { id },
    include: [
      {
        model: GalleryWorship,
        as: "galleries",
      },
    ],
  });
  return worshipPlace;
};

module.exports = {
  findObjects,
  findAttraction,
  findObjectAround,
  findCulinaryPlace,
  findSouvenirPlace,
  findAllObjects,
  findAttraction,
  findHomestay,
  findWorshipPlace,
};
