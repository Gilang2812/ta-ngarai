const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 


const CraftVariant = sequelize.define('CraftVariant', {
  id: {
    type: DataTypes.STRING(5),
    primaryKey: true,
    allowNull: false
  },
  id_craft: {
    type: DataTypes.STRING(5),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  modal: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'craft_variant',
  timestamps: false
});

module.exports = CraftVariant;