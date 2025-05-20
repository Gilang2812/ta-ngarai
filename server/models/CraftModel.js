const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const { generateCustomId } = require('../utils/generateId');

const Craft = sequelize.define('Craft', {
  id: {
    type: DataTypes.STRING(5),
    primaryKey: true,
    allowNull: true
  },
  id_souvenir_place: {
    type: DataTypes.STRING(5),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  tableName: 'craft',
  timestamps: false
});

Craft.beforeCreate(async(instance)=>{
  instance.id = await generateCustomId('CR',Craft,5)
})

module.exports= {Craft};