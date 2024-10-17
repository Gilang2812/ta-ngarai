const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Announcement = sequelize.define(
  "Announcement",
  {
    id: {
        type: DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true,
      },
      admin_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,   
      },
      announcement: {
        type: DataTypes.TEXT,
        allowNull: true,   
      },
      status: {
        type: DataTypes.TINYINT(4),
        allowNull: true,   
      }
  },
  {
    tableName: "announcement",
    timestamps: false,
  }
);

module.exports = { Announcement };
