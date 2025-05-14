const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 


const ItemCheckoutReviewGallery = sequelize.define('ItemCheckoutReviewGallery', {
  id: {
    type: DataTypes.STRING(5),
    primaryKey: true,
    allowNull: false
  },
  checout_id: {
    type: DataTypes.STRING(5),
    allowNull: true
  },
  craft_id: {
    type: DataTypes.STRING(5),
    allowNull: true
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'item_checkout_review_gallery',
  timestamps: false
});

module.exports = ItemCheckoutReviewGallery;