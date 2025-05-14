const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 


const Checkout = sequelize.define('Checkout', {
  id: {
    type: DataTypes.STRING(5),
    primaryKey: true,
    allowNull: false
  },
  adress_id: {
    type: DataTypes.STRING(5),
    allowNull: true
  },
  checkout_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  total_price: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.INTEGER,  
    allowNull: true
  }
}, {
  tableName: 'checkout',
  timestamps: false
});

module.exports = {Checkout};