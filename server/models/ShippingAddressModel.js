const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const ShippingAddress = sequelize.define(
  "ShippingAddress",
  {
    address_id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    customer_id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    destination_id: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    label: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    recipient_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    recipient_phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    negara: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    provinsi: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    kota: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    kecamatan: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    kelurahan: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    kode_pos: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    details: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    is_primary: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
      allowNull: true,
    },
  },
  {
    tableName: "shipping_address",
    timestamps: false,
  }
);

ShippingAddress.beforeCreate(async (instance) => {
  instance.address_id = await generateCustomId(
    "SA",
    ShippingAddress,
    5,
    "address_id"
  );
});

module.exports = ShippingAddress;
