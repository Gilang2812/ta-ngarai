const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Package = sequelize.define('Package', {
    id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type_id: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    contact_person: {
      type: DataTypes.STRING(13),
      allowNull: true,
      defaultValue: '081374519694',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    video_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY,
      allowNull: true,
    },
    min_capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    custom: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  }, {
    tableName: 'package',
    timestamps: false,  
  });

module.exports = { Package };
