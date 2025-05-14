const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const GalleryHomestay = sequelize.define(
  "GalleryHomestay",
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
    url: {
        type: DataTypes.STRING(100),
        allowNull: false,
     
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
  },
  {
    tableName: "gallery_homestay",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
GalleryHomestay.beforeCreate(async (instance) => {
    instance.id = await generateCustomId('GR',GalleryHomestay,4)
  });
module.exports = { GalleryHomestay };
