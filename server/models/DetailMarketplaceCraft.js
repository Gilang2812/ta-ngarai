const { DataTypes } = require("sequelize");
const sequlize = require("../config/database");

const DetailMarketplaceCraft = sequlize.define(
  "DetailMarketplaceCraft",
  {
    craft_variant_id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    id_souvenir_place: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    modal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description:{
      type: DataTypes.STRING(255),
      allowNull: true,
    }
  },
  {
    tableName: "detail_marketplace_craft",
    timestamps: false,
  }
);

 

module.exports = DetailMarketplaceCraft;
