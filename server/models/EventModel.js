const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    event_start: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    event_end: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contact_person: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    video_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    geom: {
      type: DataTypes.GEOMETRY(),
      allowNull: true,
    },
  },
  {
    tableName: "event",
    timestamps: false,
  }
);

Event.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("EV", Event, 5);
});

module.exports = { Event };
