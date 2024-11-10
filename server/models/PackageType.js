const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PackageType = sequelize.define(
    "PackageType", {
        id: {
            type: DataTypes.STRING(5),
            primaryKey: true,
            allowNull: false,
        },
        type_name: { type: DataTypes.STRING(50), allowNull: false },
    }, {
        tableName: "package_type",
        timestamps: false,
    }
);

module.exports = { PackageType };