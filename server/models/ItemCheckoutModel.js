const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 


const ItemCheckout = sequelize.define('ItemCheckout', {
  checout_id: {
    type: DataTypes.STRING(5),
    primaryKey: true,
    allowNull: false
  },
  craft_id: {
    type: DataTypes.STRING(5),
    primaryKey: true,
    allowNull: false
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  note: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  review_start: {
    type: DataTypes.INTEGER(1),
    allowNull: true
  },
  review_text: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'item_checkout',
  timestamps: false
});

module.exports = {ItemCheckout};