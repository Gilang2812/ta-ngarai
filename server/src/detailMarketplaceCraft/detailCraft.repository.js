const {DetailMarketplaceCraft} = require("../../models/relation");
const { buildIncludeModels } = require("./detailCraft.utils");

const findDetailCrafts = async (condition, includes) => {
  const include = buildIncludeModels(includes);
  console.log("include", include);
  return DetailMarketplaceCraft.findAll({ where: condition, include });
};

const findDetailCraft = async (key) => {
  return DetailMarketplaceCraft.findOne({
    where: key,
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

module.exports = {
  findDetailCrafts,
  findDetailCraft,
  insertDetailCraft,
  editDetailCraft,
  destroyDetailCraft,
};
