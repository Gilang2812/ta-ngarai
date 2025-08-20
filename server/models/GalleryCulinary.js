const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const GalleryCulinary = sequelize.define(
  "GalleryCulinary",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    culinary_place_id: {
      type: DataTypes.STRING(5),
    },
    url: DataTypes.STRING(255),
  },
  {
    tableName: "gallery_culinary_place",
    timestamps: false,
  }
);

GalleryCulinary.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("GA", GalleryCulinary, 5);
});

module.exports = { GalleryCulinary };
