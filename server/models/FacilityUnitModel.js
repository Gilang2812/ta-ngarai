const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const FacilityUnit = sequelize.define(
  "FacilityUnit",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "facility_unit",
    timestamps: false,
  }
);

FacilityUnit.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("FU", FacilityUnit, 4);
});
module.exports = { FacilityUnit };
