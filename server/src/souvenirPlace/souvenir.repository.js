const { and, where, col, Op } = require("sequelize");
const {
  SouvenirPlace,
  CraftVariantGallery,
  Craft,
  CraftVariant,
  DetailMarketplaceCraft,
  DetailUserSouvenir,
  GallerySouvenir,
} = require("../../models/relation");

const findSouvenirPlace = async (include = false) => {
  const souvenirPlace = await SouvenirPlace.findAll({
    include: include
      ? [
          {
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
          },
        ]
      : [],
  });

  return souvenirPlace;
};
const findUserSouvenirPlace = async (user_id) => {
  const souvenirPlace = await SouvenirPlace.findAll({
    include: [
      {
        model: DetailUserSouvenir,
        as: "detailSouvenir",
        where: {
          user_id,
        },
      },
      {
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
      },
    ],
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

const insertDetailUserSouvenir = async (body) => {
  const detail = await DetailUserSouvenir.create(body);
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
};
