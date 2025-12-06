const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const TraditionalHouse = sequelize.define(
  "TraditionalHouse",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
    },
    name: DataTypes.STRING(255),
    location_id: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    contact_person: DataTypes.STRING(13),
    ticket_price: DataTypes.INTEGER,
    category: DataTypes.INTEGER,
    min_capacity: DataTypes.INTEGER,
    open: DataTypes.TIME,
    close: DataTypes.TIME,
    description: DataTypes.TEXT,
    status: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    video_url: DataTypes.TEXT,
    geom: DataTypes.GEOMETRY,
  },
  {
    tableName: "traditional_house",
    timestamps: false,
  }
);

TraditionalHouse.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("TH", TraditionalHouse, 5);
});

TraditionalHouse.beforeFind((options) => {
  const { Location } = require("./relation");

  if (!options.include) options.include = [];

  options.include.push({
    model: Location,
    as: "location",
  });
});

module.exports = { TraditionalHouse };
