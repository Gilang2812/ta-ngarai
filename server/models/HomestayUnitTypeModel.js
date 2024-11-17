const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const HomestayUnitType = sequelize.define(
  "HomestayUnitType",
  {
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    name_type: {
      type: DataTypes.STRING(50)
      },
  
  },
  {
    tableName: "homestay_unit_type",
    timestamps: false,
  }
);

module.exports = { HomestayUnitType };
