const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FacilityUnit = sequelize.define('FacilityUnit', {
    id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'facility_unit',
    timestamps: false
});

module.exports = {FacilityUnit};
