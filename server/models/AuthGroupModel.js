const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const AuthGroup = sequelize.define('AuthGroup', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  
}, {
  tableName: 'auth_groups', 
  timestamps: false
});

module.exports = {AuthGroup};
