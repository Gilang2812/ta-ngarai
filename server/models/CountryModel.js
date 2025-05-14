const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Negara = sequelize.define('Negara', {
    id: {
        type: DataTypes.STRING(3),
        primaryKey: true,
      },
      name: DataTypes.STRING(255),
      geom: DataTypes.GEOMETRY() 
  
}, {
  tableName: 'negara', 
  timestamps: false
});

module.exports = {Negara};
