const { and, where, col, Op } = require("sequelize");
const {
  SouvenirPlace,
  CraftVariantGallery,
  Craft,
  CraftVariant,
  DetailMarketplaceCraft,
  DetailUserSouvenir,
  GallerySouvenir,
  User,
} = require("../../models/relation");

const findSouvenirPlace = async (include = false) => {
  console.log("include", include);
  const includeItems = include
    ? {
        model: DetailMarketplaceCraft,
        as: "crafts",
        include: [
          {
            model: CraftVariant,
            as: "variant",
            include: [
              {
                model: Craft,
                as: "craft",
              },
            ],
          },
          {
            model: CraftVariantGallery,
            as: "craftGalleries",

            where: {
              [Op.and]: [
                where(
                  col("crafts.craft_variant_id"),
                  "=",
                  col("crafts->craftGalleries.craft_variant_id")
                ),
                where(
                  col("crafts.id_souvenir_place"),
                  "=",
                  col("crafts->craftGalleries.id_souvenir_place")
                ),
              ],
            },

            required: false,
          },
        ],
      }
    : [];
  const souvenirPlace = await SouvenirPlace.findAll({
    include: [
      { model: GallerySouvenir, as: "galleries" },
      {
        model: DetailUserSouvenir,
        as: "detailSouvenir",
      },
      ...(Array.isArray(includeItems) ? includeItems : [includeItems]),
    ],
  });
 
  return souvenirPlace;
};
const findUserSouvenirPlace = async (user_id) => {
  const souvenirPlace = await SouvenirPlace.findAll({
    attributes: ["id"],
    include: [
      {
        model: DetailUserSouvenir,
        as: "detailSouvenir",
        where: { user_id },
        attributes: ["id_souvenir_place"],
        include: [
          {
            model: SouvenirPlace,
            as: "souvenirPlace",
            include: [
              { model: GallerySouvenir, as: "galleries" },
              {
                model: DetailUserSouvenir,
                as: "detailSouvenir",
                include: [
                  {
                    model: User,
                    as: "user",
                    attributes: [
                      "id",
                      "username",
                      "email",
                      "fullname",
                      "user_image",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  const reformSouvenir = souvenirPlace.flatMap((sp) =>
    sp.detailSouvenir.map((ds) => ds.souvenirPlace)
  );
  return reformSouvenir;
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
  const sp = await SouvenirPlace.findOne({
    where: { id },
    include: [
      {
        model: GallerySouvenir,
        as: "galleries",
      },
    ],
  });
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

const findDetailUserSouvenir = async (codition) => {
  const detail = await DetailUserSouvenir.findAll({
    where: codition,
    include: [
      {
        model: SouvenirPlace,
        as: "souvenirPlace",
        attributes: ["id", "name"],
      },
    ],
  });
  return detail;
};

const insertDetailUserSouvenir = async (body) => {
  const detail = await DetailUserSouvenir.create(body);
  return detail;
};

const updateDetailUserSouvenir = async (key, body) => {
  const detail = await DetailUserSouvenir.update(body, { where: key });
  return detail;
};

const destoryDetailUserSouvenir = async (key) => {
  const detail = await DetailUserSouvenir.destroy({ where: key });
  return detail;
};

module.exports = {
  findSouvenirPlace,
  insertSouvenirPlace,
  findSouvenirPlaceById,
  updateSouvenirPlace,
  deleteSouvenirPlace,
  insertDetailUserSouvenir,
  findUserSouvenirPlace,
  findDetailUserSouvenir,
  updateDetailUserSouvenir,
  destoryDetailUserSouvenir,
};
