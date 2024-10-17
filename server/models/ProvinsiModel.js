const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Provinsi = sequelize.define('Provinsi', {
    id: {
        type: DataTypes.STRING(3),
        primaryKey: true,
      },
      name: DataTypes.STRING(255),
      geom: DataTypes.GEOMETRY() 
  
}, {
  tableName: 'zprovinsi', 
  timestamps: false
});

module.exports = {Provinsi};
