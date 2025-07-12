const sequelize = require("../config/database");

const { DataTypes } = require("sequelize");

const MarketplaceOwnerModel = sequelize.define(
  "MarketplaceOwnerModel",
    {
        id_user: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
        },
        id_souvenir_place: {
        type: DataTypes.STRING(50),
        allowNull: false,
        },
 
    },
    {
        tableName: "marketplace_owner",
        timestamps: false,
    }
);

module.exports = MarketplaceOwnerModel;