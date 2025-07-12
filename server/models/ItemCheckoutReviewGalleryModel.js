const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const { generateCustomId } = require('../utils/generateId');


const ItemCheckoutReviewGallery = sequelize.define('ItemCheckoutReviewGallery', {
  id: {
    type: DataTypes.STRING(5),
    primaryKey: true,
    allowNull: true
  },
  checkout_id: {
    type: DataTypes.STRING(5),
    allowNull: false
  },
  craft_variant_id: {
    type: DataTypes.STRING(5),
    allowNull: false
  },
  id_souvenir_place: {
    type: DataTypes.STRING(5),
    allowNull: false
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'item_checkout_review_gallery',
  timestamps: false
});

ItemCheckoutReviewGallery.beforeCreate(async(instance)=>{
  instance.id =  await generateCustomId("CG", ItemCheckoutReviewGallery, 5);
})

module.exports = ItemCheckoutReviewGallery;