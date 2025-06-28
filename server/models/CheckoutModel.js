const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const { generateCustomId } = require('../utils/generateId');


const Checkout = sequelize.define('Checkout', {
  id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: true
  },
  address_id: {
    type: DataTypes.STRING(5),
    allowNull: true
  },
  payment:{
    type: DataTypes.STRING(30),
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

Checkout.beforeCreate(async(instance)=>{
  instance.id = await generateCustomId('test',Checkout,10)
})

module.exports = {Checkout};