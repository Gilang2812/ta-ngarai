const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Attraction = sequelize.define(
  "Attraction",
  {
    id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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
