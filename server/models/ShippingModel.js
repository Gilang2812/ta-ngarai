const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const Shipping = sequelize.define(
  "Shipping",
  {
    shipping_id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    shipping_no: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    awb: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    shipping_name: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    shipping_type: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    total_shipping_cost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    grand_total: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    tableName: "shipping",
    timestamps: false,
  }
);

Shipping.beforeCreate(async (instance) => {
  instance.shipping_id = await generateCustomId("S", Shipping, 5, "shipping_id");
  // Generate shipping_no in the format KOM<shipping_id><current date: YYMMDD><random 4 digits>
  const date = new Date();
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4 random digits
  instance.shipping_no = `KOM${instance.shipping_id}${yy}${mm}${dd}${randomDigits}`;
});

module.exports = Shipping;
