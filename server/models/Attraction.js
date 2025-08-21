const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const Attraction = sequelize.define(
  "Attraction",
  {
    id: {
      type: DataTypes.STRING(5),
      allowNull: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    min_capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    video_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY(),
      allowNull: true,
    },
    geom_area: {
      type: DataTypes.GEOMETRY(),
      allowNull: true,
    },
  },
  {
    tableName: "attraction",
    timestamps: false,
  }
);

Attraction.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("AT", Attraction, 5);
});
module.exports = { Attraction };
