const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const AuthGroupUsers = sequelize.define('AuthGroupUsers', {
  group_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'auth_groups_users', 
  timestamps: false,
});

module.exports = {AuthGroupUsers};
