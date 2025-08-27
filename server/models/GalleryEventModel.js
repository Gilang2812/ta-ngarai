const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const GalleryEvent = sequelize.define(
  "GalleryEvent",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    event_id: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "gallery_event",
    timestamps: false, 
  }
);
GalleryEvent.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("GE", GalleryEvent, 4);
});
module.exports = { GalleryEvent };
