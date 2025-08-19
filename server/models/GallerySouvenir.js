const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const GallerySouvenir = sequelize.define(
  "GallerySouvenir",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    souvenir_place_id: {
      type: DataTypes.STRING(5),
      references: {
        model: "package",
        key: "id",
      },
    },
    url: DataTypes.STRING(255),
  },
  {
    tableName: "gallery_souvenir_place",
    timestamps: false,
  }
);

GallerySouvenir.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("GS", GallerySouvenir, 5);
});

module.exports = { GallerySouvenir };
