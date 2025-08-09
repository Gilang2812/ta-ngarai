const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UnitHomestay = sequelize.define(
  "UnitHomestay",
  {
    homestay_id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      field: 'homestay_id'  
    },
    unit_type: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      field: 'unit_type'
    },
    unit_number: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      field: 'unit_number'
    },
    unit_name: {
      type: DataTypes.STRING(50),
      field: 'unit_name'
    },
    description: {
      type: DataTypes.TEXT,
      field: 'description'
    },
    price: {
      type: DataTypes.INTEGER(11),
      field: 'price'
    },
    capacity: {
      type: DataTypes.INTEGER(11),
      field: 'capacity'
    }
  },
  {
    indexes: [{
      unique: true,
      fields: ['homestay_id', 'unit_number', 'unit_type']
    }],
    tableName: "unit_homestay",
    timestamps: false
  }
);
module.exports = { UnitHomestay };
