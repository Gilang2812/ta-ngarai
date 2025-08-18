const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DetailUserSouvenir = sequelize.define(
  "DetailUserSouvenir",
  {
    user_id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      allowNull: false,
    },
    id_souvenir_place: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    isOwner: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
    },
  },
  {
    tableName: "detail_user_souvenir",
    timestamps: false,
  }
);

module.exports = { DetailUserSouvenir };
