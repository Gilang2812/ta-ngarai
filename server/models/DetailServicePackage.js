const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const   DetailServicePackage = sequelize.define(
  "DetailServicePackage",
  {
    package_id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    service_package_id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull:false
    },
    status: {type: DataTypes.TINYINT(1),
        allowNull:false,
    },
    status_created: {
      type: DataTypes.TINYINT(4),
      allowNull: true,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    tableName: "detail_service_package",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = { DetailServicePackage };
