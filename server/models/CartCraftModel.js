const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

 
  const CraftCart = sequelize.define(
    "CraftCart",
    {
      craft_variant_id: {
        type: DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true, 
      },
      user_id: {
        type: DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true, 
      },
      jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "craft_cart",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["craft_variant_id", "user_id"],
        },
      ],
    }
  );



  module.exports = CraftCart;
 
