const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TourismVillage = sequelize.define(
  "TourismVillage",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    type_of_tourism: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    province_id: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    open: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    close: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    ticket_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    contact_person: {
      type: DataTypes.STRING(13),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("POINT"),
      allowNull: true,
    },
    lat: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },
    lng: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },
    bank_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    bank_code: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    bank_account_holder: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    bank_account_number: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    qr_url: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "tourism_village",
    timestamps: false,
  }
);

module.exports = { TourismVillage };
