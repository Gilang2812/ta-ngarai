const {
  SouvenirPlace,
  CraftVariantGallery,
  Craft,
  CraftVariant,
} = require("../../models/relation");

const findSouvenirPlace = async (include = false) => {
  const souvenirPlace = await SouvenirPlace.findAll({
    include: include
      ? [
          {
            model: Craft,
            as: "crafts",
            include: [
              {
                model: CraftVariant,
                as: "variants",
                include: [
                  {
                    model: CraftVariantGallery,
                    as: "craftGalleries",
                    limit: 1
                  },
                ],
              },
            ],
          },
        ]
      : [],
  });

  return souvenirPlace;
};

const insertSouvenirPlace = async (body) => {
  const { geom, ...rest } = body;
  console.log(typeof geom !== "object");
  const souvenir = await SouvenirPlace.create({
    ...rest,
    geom: geom && typeof geom !== "object" ? JSON.parse(geom) : geom,
  });

  return souvenir;
};

const findSouvenirPlaceById = async (id) => {
  const sp = await SouvenirPlace.findByPk(id);
  return sp;
};
const updateSouvenirPlace = async (id, body) => {
  const { geom, ...rest } = body;
  console.log(rest);
  const updatedSP = await SouvenirPlace.update(
    { ...rest, geom: JSON.parse(geom) },
    { where: { id: id } }
  );

  console.log({ id, ...rest, hasil: updatedSP, status: "success" });
  return updatedSP;
};

const deleteSouvenirPlace = async (id) => {
  const souvenirPlace = await SouvenirPlace.destroy({ where: { id } });
  return souvenirPlace;
};

module.exports = {
  findSouvenirPlace,
  insertSouvenirPlace,
  findSouvenirPlaceById,
  updateSouvenirPlace,
  deleteSouvenirPlace,
};
