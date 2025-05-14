const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Craft = sequelize.define('Craft', {
  id: {
    type: DataTypes.STRING(5),
    primaryKey: true,
    allowNull: false
  },
  id_souvenir_place: {
    type: DataTypes.STRING(5),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: true
  }
}, {
  tableName: 'craft',
  timestamps: false
});

module.exports= {Craft};