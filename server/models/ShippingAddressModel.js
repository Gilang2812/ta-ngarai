const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ShippingAddress = sequelize.define('ShippingAddress', {
  id: {
    type: DataTypes.STRING(5),
    primaryKey: true,
    allowNull: false
  },
  customer_id: {
    type: DataTypes.STRING(5),
    allowNull: true
  },
  recipient_name: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  provinsi: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  kota: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  kecamatan: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  kode_post: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  street: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  details: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'shipping_address',
  timestamps: false
});

module.exports = ShippingAddress;