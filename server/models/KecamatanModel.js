const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Kecamatan = sequelize.define('Kecamatan', {
    id: {
        type: DataTypes.STRING(3),
        primaryKey: true,
      },
      name: DataTypes.STRING(255),
      geom: DataTypes.GEOMETRY() 
  
}, {
  tableName: 'kecamatan', 
  timestamps: false
});

module.exports = {Kecamatan};
