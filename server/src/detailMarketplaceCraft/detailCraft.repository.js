const {
  DetailMarketplaceCraft,
  CraftVariant,
  Craft,
  SouvenirPlace,
} = require("../../models/relation");
const { buildIncludeModels } = require("./detailCraft.utils");

const findDetailCrafts = async (condition, includes) => {
  const include = buildIncludeModels(includes);
  console.log("include", include);
  return DetailMarketplaceCraft.findAll({ where: condition, include });
};

const findDetailCraft = async (key, includes = []) => {
  const include = buildIncludeModels(includes);
  return DetailMarketplaceCraft.findOne({
    where: key,
    include,
  });
};

const insertDetailCraft = async (body) => {
  return DetailMarketplaceCraft.create(body);
};
const editDetailCraft = async (key, body) => {
  return DetailMarketplaceCraft.update(body, {
    where: key,
  });
};

const destroyDetailCraft = async (key) => {
  return DetailMarketplaceCraft.destroy({
    where: key,
  });
};

const findOrderDetailCraft = async (key) => {
  console.log("key", key);
  const include = buildIncludeModels(["craftGalleries", "checkout"]);
  return DetailMarketplaceCraft.findAll({
    where: { id_souvenir_place: key.id_souvenir_place },
    include: [
      {
        model: CraftVariant,
        as: "variant",
        where: { id_craft: key.id_craft },
        attributes: ["id", "name", "id_craft"],

        include: [
          {
            model: Craft,
            as: "craft",
            attributes: ["id", "name"],
          },
        ],
      },
      {
        model: SouvenirPlace,
        as: "souvenirPlace",
        attributes: ["id", "name"],
      },
      ...include,
    ],
  });
};

module.exports = {
  findDetailCrafts,
  findDetailCraft,
  insertDetailCraft,
  editDetailCraft,
  destroyDetailCraft,
  findOrderDetailCraft,
};
