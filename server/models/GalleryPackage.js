const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const GalleryPackage = sequelize.define(
  "GalleryPackage",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    package_id: {
      type: DataTypes.STRING(5),
      references: {
        model: "package",
        key: "id",
      },
    },
    url: DataTypes.STRING(255),
  },
  {
    tableName: "gallery_package",
    timestamps: false,
  }
);

GalleryPackage.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("GP", GalleryPackage, 5);
});

module.exports = { GalleryPackage };
