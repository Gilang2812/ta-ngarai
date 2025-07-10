const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const Shipping = sequelize.define(
  "Shipping",
  {
    shipping_id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    shipping_no: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    
    awb: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    shipping_name: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    shipping_type: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    total_shipping_cost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    grand_total: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,  
    },
  },
  {
    tableName: "shipping",
    timestamps: false,
  }
);

 
module.exports = Shipping;
