const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const Location = sequelize.define(
  "Location",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    province: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    regency: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    village: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
  },
  {
    tableName: "locations",
    timestamps: false,
  }
);

Location.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("L", Location, 5);
});

module.exports = { Location };
