const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const GalleryWorship = sequelize.define(
  "GalleryWorship",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    worship_place_id: {
      type: DataTypes.STRING(5),
    },
    url: DataTypes.STRING(255),
  },
  {
    tableName: "gallery_worship",
    timestamps: false,
  }
);

GalleryWorship.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("GA", GalleryWorship, 5);
});

module.exports = { GalleryWorship };
