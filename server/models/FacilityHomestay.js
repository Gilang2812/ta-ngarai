const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { generateCustomId } = require("../utils/generateId");

const FacilityHomestay = sequelize.define(
  "FacilityHomestay",
  {
    id: {
      type: DataTypes.STRING(4),
      primaryKey: true,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "facility_homestay",
    timestamps: false,
  }
);
FacilityHomestay.beforeCreate(async (instance) => {
    instance.id = await generateCustomId('FH',FacilityHomestay,4)
  });
module.exports = { FacilityHomestay };
