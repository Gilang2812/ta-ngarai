const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const   DetailReservation = sequelize.define(
  "DetailReservation",
  {
    date: {
      type: DataTypes.DATE,
      primaryKey: true,
      field: 'date'
    },
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
      type: DataTypes.STRING(2),
      primaryKey: true,
      field: 'unit_number'
    },
    reservation_id: {
      type: DataTypes.STRING(8),
      primaryKey: true,
      field: 'reservation_id'
    },
    review: {
      type: DataTypes.TEXT,
      field: 'review'
    },
    rating: {
      type: DataTypes.INTEGER,
      field: 'rating'
    },
    unit_guest: {
      type: DataTypes.INTEGER,
      field: 'unit_guest'
    }
  },
  {
    indexes: [{
      unique: true,
      fields: ['date', 'homestay_id', 'unit_type', 'unit_number', 'reservation_id']
    }],
    tableName: "detail_reservation",
    timestamps: false
  }
);

module.exports = { DetailReservation };
