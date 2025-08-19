const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");
const { CustomError } = require("../utils/CustomError");

const Craft = sequelize.define(
  "Craft",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "craft",
    timestamps: false,
    deletedAt: "deleted_at",
    paranoid: true,
  }
);

Craft.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("CR", Craft, 5);
});

Craft.beforeBulkDestroy(async (crafts) => {
  const { CraftVariant } = require("./relation.js");

  const where = crafts.where;

  const existingVariant = await CraftVariant.count({
    where: { id_craft: where.id },
  });

  if (existingVariant > 0) {
    throw new CustomError(
      `Cannot delete craft with existing in ${existingVariant} variants`,400
    );
  }
});
module.exports = { Craft };
