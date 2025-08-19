const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");
const { CustomError } = require("../utils/CustomError.js");

const CraftVariant = sequelize.define(
  "CraftVariant",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    id_craft: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "craft_variant",
    timestamps: false,
    deletedAt: "deleted_at",
    paranoid: true,
  }
);

CraftVariant.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("CV", CraftVariant, 5);
});
CraftVariant.beforeBulkDestroy(async (crafts) => {
  const { DetailMarketplaceCraft } = require("./relation.js");

  const where = crafts.where;

  const existingVariant = await DetailMarketplaceCraft.count({
    where: { craft_variant_id: where.id },
  });

  if (existingVariant > 0) {
    throw new CustomError(
      `Cannot delete variants with existing in ${existingVariant} detailCraft`,
      400
    );
  }
});
module.exports = CraftVariant;
