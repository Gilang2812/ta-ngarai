const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PackageDay = sequelize.define(
  "PackageDay",
  {
    package_id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    day: {
      type: DataTypes.CHAR(2),
      primaryKey: true,
      allowNull: false,
    },
    description: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.TINYINT(4), allowNull: true, defaultValue: 0 },
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
    tableName: "package_day",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = { PackageDay };
