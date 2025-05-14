const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FacilityType = sequelize.define('FacilityType', {
    id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    tableName: 'facility_type',
    timestamps: false
});

module.exports = {FacilityType};
