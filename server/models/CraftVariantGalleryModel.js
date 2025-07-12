const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const CraftVariantGallery = sequelize.define(
  "CraftVariantGallery",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    craft_variant_id: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    id_souvenir_place: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
     deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "craft_variant_gallery",
    timestamps: false,
    deletedAt: "deleted_at",
    paranoid: true,
  }
);

CraftVariantGallery.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("CG", CraftVariantGallery, 5);
});

module.exports = CraftVariantGallery;
