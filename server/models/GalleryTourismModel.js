const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const GalleryTourism = sequelize.define('GalleryTourism', {
    id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
      },
      tourism_village_id:{
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
  
}, {
  tableName: 'gallery_tourism_village', 
  timestamps: false
});

module.exports = {GalleryTourism};
