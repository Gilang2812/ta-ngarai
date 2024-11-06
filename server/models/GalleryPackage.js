const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const GalleryPackage = sequelize.define(
  "GalleryPackage",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
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

module.exports = { GalleryPackage };
