const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Facility = sequelize.define('Facility', {
    id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    type_id: {
        type: DataTypes.STRING(5),
        allowNull: false,
     
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    category: {
        type: DataTypes.TINYINT,
        allowNull: true
    },
    min_capacity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    geom: {
        type: DataTypes.GEOMETRY,
        allowNull: true
    }
}, {
    tableName: 'facility',
    timestamps: false
});

module.exports = {Facility};
