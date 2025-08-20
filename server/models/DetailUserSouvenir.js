const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { CustomError } = require("../utils/CustomError");

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
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "detail_user_souvenir",
    timestamps: false,
  }
);

DetailUserSouvenir.beforeCreate(async (instance) => {
  console.log("test");
  const existingData = await DetailUserSouvenir.findOne({
    where: {
      user_id: instance.user_id,
      id_souvenir_place: instance.id_souvenir_place,
    },
  });
  if (existingData) {
    throw new CustomError("User already exists at this souvenir place", 400);
  }
});

module.exports = { DetailUserSouvenir };
