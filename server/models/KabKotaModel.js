const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const KabKota = sequelize.define(
  "KabKota",
  {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
    },
    name: DataTypes.STRING(255),
    geom: DataTypes.GEOMETRY(),
  },
  {
    tableName: "zkab_kota",
    timestamps: false,
  }
);

module.exports = { KabKota };
