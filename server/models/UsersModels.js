  const { DataTypes } = require('sequelize');
  const sequelize = require('../config/db'); 

  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true

    },
    fullname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_image: {
      type: DataTypes.STRING(255),
      defaultValue: 'default.jpg'
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reset_hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reset_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reset_expires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    activate_hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status_message: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    active: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1
    },
    force_pass_reset: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true 
  },{
    hooks: {
      beforeCreate: async (user) => {
        if (user.password_hash) {
         
          user.password_hash = await bcrypt.hash(user.password_hash, 10);
        }
      },
    }
  },);

  module.exports = {User};
