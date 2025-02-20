const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FacilityUnitDetail = sequelize.define('FacilityUnitDetail', {
    homestay_id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false
    },
    unit_type: {
        type: DataTypes.STRING(2),
        primaryKey: true,
        allowNull: false
    },
    unit_number: {
        type: DataTypes.STRING(2),
        primaryKey: true,
        allowNull: false
    },
    facility_unit_id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    tableName: 'facility_unit_detail',
    timestamps: false
});

module.exports = {FacilityUnitDetail};
