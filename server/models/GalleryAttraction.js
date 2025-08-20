const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const GalleryAttraction = sequelize.define(
  "GalleryAttraction",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    attraction_id: {
      type: DataTypes.STRING(5),
    },
    url: DataTypes.STRING(255),
  },
  {
    tableName: "gallery_attraction",
    timestamps: false,
  }
);

GalleryAttraction.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("GA", GalleryAttraction, 5);
});

module.exports = { GalleryAttraction };
