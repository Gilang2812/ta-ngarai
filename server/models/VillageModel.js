const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Village = sequelize.define(
  "Village",
  {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
    },
    name: DataTypes.STRING(255),
    geom: DataTypes.GEOMETRY(),
  },
  {
    tableName: "village",
    timestamps: false,
  }
);

module.exports = { Village };
