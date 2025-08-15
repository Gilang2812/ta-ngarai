const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const fs = require("fs");
const { CustomError } = require("../utils/CustomError");

const UnitHomestay = sequelize.define(
  "UnitHomestay",
  {
    homestay_id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      field: "homestay_id",
    },
    unit_type: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      field: "unit_type",
    },
    unit_number: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      field: "unit_number",
    },
    unit_name: {
      type: DataTypes.STRING(50),
      field: "unit_name",
    },
    description: {
      type: DataTypes.TEXT,
      field: "description",
    },
    price: {
      type: DataTypes.INTEGER(11),
      field: "price",
    },
    capacity: {
      type: DataTypes.INTEGER(11),
      field: "capacity",
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["homestay_id", "unit_number", "unit_type"],
      },
    ],
    tableName: "unit_homestay",
    timestamps: false,
  }
);

UnitHomestay.beforeCreate(async (instance) => {
  const unit = await UnitHomestay.findOne({
    where: {
      homestay_id: instance.homestay_id,
      unit_type: instance.unit_type,
    },
    order: [["unit_number", "DESC"]],
  });
  const newNumber = unit ? parseInt(unit.unit_number) + 1 : 1;
  console.log("newNumber", newNumber.toString().length);
  instance.unit_number = newNumber.toString().padStart(2, "0");
});

UnitHomestay.beforeBulkDestroy(async (instance) => {
  const {
    DetailReservation,
    GalleryUnit,
    FacilityUnitDetail,
  } = require("./relation");
  const where = instance.where;
  const count = await DetailReservation.count({
    where: {
      homestay_id: where.homestay_id,
      unit_type: where.unit_type,
      unit_number: where.unit_number,
    },
  });
  console.log("where bulk", where);
  if (count > 0) {
    throw new CustomError(
      `Cannot delete, still used in ${count}Detail Reservation.`,
      400
    );
  }
  await FacilityUnitDetail.destroy({
    where: {
      homestay_id: where.homestay_id,
      unit_type: where.unit_type,
      unit_number: where.unit_number,
    },
  });

  const gallery = await GalleryUnit.findAll({
    where: {
      homestay_id: where.homestay_id,
      unit_type: where.unit_type,
      unit_number: where.unit_number,
    },
  });

  await GalleryUnit.destroy({
    where: {
      homestay_id: where.homestay_id,
      unit_type: where.unit_type,
      unit_number: where.unit_number,
    },
  });
  for (const item of gallery) {
    fs.unlinkSync(`public\\${item.url}`, (err) => {
      if (err) {
        console.error(`Error deleting file ${item.url}:`, err);
      }
    });
  }
});

module.exports = { UnitHomestay };
