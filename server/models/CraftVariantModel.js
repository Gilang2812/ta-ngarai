const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const CraftVariant = sequelize.define(
  "CraftVariant",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    id_craft: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
  },
  {
    tableName: "craft_variant",
    timestamps: false,
  }
);

CraftVariant.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("CV", CraftVariant, 5);
});
module.exports = CraftVariant;
