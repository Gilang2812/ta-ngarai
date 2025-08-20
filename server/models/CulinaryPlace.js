const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const CulinaryPlace = sequelize.define(
  "CulinaryPlace",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contact_person: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    open: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    close: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    geom: {
      type: DataTypes.GEOMETRY,
      allowNull: true,
    },
  },
  {
    tableName: "culinary_place",
    timestamps: false,
  }
);

CulinaryPlace.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("CP", CulinaryPlace, 5);
});

module.exports = CulinaryPlace;
