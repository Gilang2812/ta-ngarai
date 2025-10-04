const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");

const ItemCheckout = sequelize.define(
  "ItemCheckout",
  {
    checkout_id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    craft_variant_id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    id_souvenir_place: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    shipping_id: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    owner_responder_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    review_rating: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
    },
    review_text: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    review_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    seller_response: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    response_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "item_checkout",
    timestamps: false,
  }
);

module.exports = { ItemCheckout };
