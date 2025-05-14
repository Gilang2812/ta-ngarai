const { DataTypes, TINYINT } = require("sequelize");
const sequelize = require("../config/database");

const ServicePackage = sequelize.define(
  "ServicePackage",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(25), allowNull: false },
    price: { type: DataTypes.STRING(11), allowNull: true, defaultValue: 0 },
    category: { type: DataTypes.TINYINT(4), allowNull: true },
    min_capacity: {
      type: DataTypes.STRING(11),
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: "service_package",
    timestamps: false,
  }
);

module.exports = { ServicePackage };
