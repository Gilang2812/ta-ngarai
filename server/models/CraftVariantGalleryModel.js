const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const { generateCustomId } = require('../utils/generateId');


const CraftVariantGallery = sequelize.define('CraftVariantGallery', {
  id: {
    type: DataTypes.STRING(5),
    primaryKey: true,
    allowNull: false
  },
  checkout_id: {
    type: DataTypes.STRING(5),
    allowNull: true
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'craft_variant_gallery',
  timestamps: false
});

CraftVariantGallery.beforeCreate(async(instance)=>{
  instance.id = await generateCustomId('CG',CraftVariantGallery,5)
})

module.exports = CraftVariantGallery;