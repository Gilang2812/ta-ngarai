const { DataTypes } = require("sequelize");
const sequlize = require("../config/database");
const { CustomError } = require("../utils/CustomError");

const DetailMarketplaceCraft = sequlize.define(
  "DetailMarketplaceCraft",
  {
    craft_variant_id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    id_souvenir_place: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    modal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "detail_marketplace_craft",
    timestamps: false,
  }
);

DetailMarketplaceCraft.beforeBulkDestroy(async (crafts) => {
  const { ItemCheckout, CraftVariantGallery } = require("./relation.js");

  const where = crafts.where;

  const item = await ItemCheckout.count({
    where: {
      craft_variant_id: where.craft_variant_id,
      id_souvenir_place: where.id_souvenir_place,
    },
  });

  if (item > 0) {
    throw new CustomError(
      `Cannot delete craft with existing in ${item} variants`,
      400
    );
  }

  const galleries = await CraftVariantGallery.findAll({
    where: {
      craft_variant_id: where.craft_variant_id,
      id_souvenir_place: where.id_souvenir_place,
    },
  });

  if (galleries.length > 0) {
    for (const image of galleries) {
      fs.unlinkSync(`public\\${image.url}`);
    }
  }
});

module.exports = DetailMarketplaceCraft;
