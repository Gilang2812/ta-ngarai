const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const CulinaryPlace = sequelize.define(
  "CulinaryPlace",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    contact_person: {
      type: DataTypes.STRING(13),
      allowNull: true,
    },
    open: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    close: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      allowNull: true,
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
