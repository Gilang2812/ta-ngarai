const { DataTypes, TINYINT } = require("sequelize");
const sequelize = require("../config/database");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
    },
    role: { type: DataTypes.STRING(25), allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    tableName: "role",
    timestamps: false,
  }
);

module.exports = { Role };
