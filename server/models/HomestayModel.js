const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const Homestay = sequelize.define(
  "Homestay",
  {
    id: {
      type: DataTypes.STRING(5),
      allowNull: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(100),
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
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
    geom: {
      type: DataTypes.GEOMETRY,
      allowNull: true,
    },
    open: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    close: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    homestay_status: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
    },
    video_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "homestay",
    timestamps: false, // Nonaktifkan timestamps jika tidak diperlukan
  }
);

Homestay.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("HO", Homestay, 5);
});

module.exports = { Homestay };
