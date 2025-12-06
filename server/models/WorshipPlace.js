const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const WorshipPlace = sequelize.define(
  "WorshipPlace",
  {
    id: {
      type: DataTypes.STRING(8), // WO + 5 digits = 7-8 characters
      allowNull: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    location_id: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING(30),
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

WorshipPlace.beforeFind((options) => {
  const { Location } = require("./relation");

  if (!options.include) options.include = [];

  options.include.push({
    model: Location,
    as: "location",
  });
});

module.exports = { WorshipPlace };
