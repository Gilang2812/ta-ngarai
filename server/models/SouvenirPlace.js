const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const SouvenirPlace = sequelize.define(
  "SouvenirPlace",
  {
    id: {
      type: DataTypes.STRING(5),
      allowNull: true,
      primaryKey: true,
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
      type: DataTypes.STRING(15),
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 0,
    },
    geom: {
      type: DataTypes.GEOMETRY(),
      allowNull: true,
    },
  },
  {
    tableName: "souvenir_place",
    timestamps: false,
  }
);

SouvenirPlace.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("SP", SouvenirPlace, 5);
});

// SouvenirPlace.beforeBulkDestroy(async (instaces) => {
//   const where = instaces.where;
//   const e
// });
module.exports = { SouvenirPlace };
