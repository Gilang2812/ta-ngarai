const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    modal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(255),
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
module.exports = CraftVariant;
