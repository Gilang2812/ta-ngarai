const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");
const { CustomError } = require("../utils/CustomError");

const ServicePackage = sequelize.define(
  "ServicePackage",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(25), allowNull: false },
    price: { type: DataTypes.STRING(11), allowNull: true, defaultValue: 0 },
    category: { type: DataTypes.TINYINT(4), allowNull: true },
    min_capacity: {
      type: DataTypes.STRING(11),
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: "service_package",
    timestamps: false,
  }
);

ServicePackage.beforeCreate(async (service) => {
  service.id = await generateCustomId("S", ServicePackage, 3);
});

ServicePackage.beforeBulkDestroy(async (services) => {
  const { DetailServicePackage } = require("./relation");
  const where = services.where;
  const count = await DetailServicePackage.count({
    where: { service_package_id: where.id },
  });

  if (count > 0) {
    throw new CustomError(
      `Tidak dapat menghapus, masih digunakan di ${count} package.`,
      409
    );
  }
});
ServicePackage.beforeDestroy(async (service) => {
  const { DetailServicePackage } = require("./relation");

  const count = await DetailServicePackage.count({
    where: { service_package_id: service.id },
  });

  if (count > 0) {
    throw new CustomError(
      `Tidak dapat menghapus, masih digunakan di ${count} package.`,
      409
    );
  }
});

module.exports = { ServicePackage };
