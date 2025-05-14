const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DetailPackage = sequelize.define(
  "DetailPackage",
  {
    package_id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    day: {
      type: DataTypes.CHAR(5),
      primaryKey: true,
      allowNull: false,
    },
    activity: {
      type: DataTypes.CHAR(2),
      primaryKey: true,
      allowNull: false,
    },
    activity_type: DataTypes.CHAR(2),
    object_id: { type: DataTypes.STRING(5), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.TINYINT(4), allowNull: true },
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
    tableName: "detail_package",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = { DetailPackage };
