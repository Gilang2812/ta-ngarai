const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const Craft = sequelize.define(
  "Craft",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    }, 
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "craft",
    timestamps: false,
    deletedAt: "deleted_at",
    paranoid: true,
  }
);

Craft.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("CR", Craft, 5);
});

module.exports = { Craft };
