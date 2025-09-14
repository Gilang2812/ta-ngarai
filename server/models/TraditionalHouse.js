const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const TraditionalHouse = sequelize.define(
  "TraditionalHouse",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull:true
    },
    name: DataTypes.STRING(255),
    address: DataTypes.STRING(255),
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

module.exports = { TraditionalHouse };
