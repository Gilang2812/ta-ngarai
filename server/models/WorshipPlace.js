const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const WorshipPlace = sequelize.define(
  "WorshipPlace",
  {
    id: {
      type: DataTypes.STRING(5),
      allowNull: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
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
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY(),
      allowNull: true,
    },
  },
  {
    tableName: "worship_place",
    timestamps: false,
  }
);

WorshipPlace.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("WO", WorshipPlace, 5);
});

module.exports = { WorshipPlace };
