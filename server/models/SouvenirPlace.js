const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SouvenirPlace = sequelize.define('SouvenirPlace', {
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
    contact_person: {
        type: DataTypes.STRING(13),
        allowNull: false
    },
    open: {
        type: DataTypes.TIME,
        allowNull: false
    },
    close: {
        type: DataTypes.TIME,
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
    tableName: 'souvenir_place',
    timestamps: false
});

module.exports = { SouvenirPlace };
