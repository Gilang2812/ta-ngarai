const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const WorshipPlace = sequelize.define('WorshipPlace', {
    id: {
        type: DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.TINYINT(1),
        allowNull: false
    },
    geom: {
        type: DataTypes.GEOMETRY(),
        allowNull: true
    }
}, {
    tableName: 'worship_place',
    timestamps: false
});

module.exports = { WorshipPlace };
