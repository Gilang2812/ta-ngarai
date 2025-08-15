const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const GalleryUnit = sequelize.define(
  "GalleryUnit",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    homestay_id: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    unit_type: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    unit_number: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "gallery_unit",
    timestamps: false,
  }
);

GalleryUnit.beforeCreate(async(instances) => {
  instances.id = await generateCustomId("GU", GalleryUnit, 5);
});
module.exports = { GalleryUnit };
