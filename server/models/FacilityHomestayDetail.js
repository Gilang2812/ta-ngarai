const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FacilityHomestayDetail = sequelize.define(
  "FacilityHomestayDetail",
  {
    homestay_id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    facility_homestay_id: {
      type: DataTypes.STRING(4),
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "facility_homestay_detail",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = { FacilityHomestayDetail };
