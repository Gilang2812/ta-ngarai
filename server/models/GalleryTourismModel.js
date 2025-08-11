const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const GalleryTourism = sequelize.define(
  "GalleryTourism",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    tourism_village_id: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "gallery_tourism_village",
    timestamps: false,
  }
);

GalleryTourism.beforeCreate(async (gallery) => {
  const id = await generateCustomId("G", GalleryTourism, 5);
  console.log("Generated ID for GalleryTourism:", id);
  gallery.id = id;
});

module.exports = { GalleryTourism };
