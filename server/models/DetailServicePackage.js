const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DetailServicePackage = sequelize.define(
  "DetailServicePackage",
  {
    package_id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    service_package_id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
    },
    status: { type: DataTypes.TINYINT(1), allowNull: false },
    status_created: {
      type: DataTypes.TINYINT(4),
      allowNull: true,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    tableName: "detail_service_package",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

DetailServicePackage.beforeCreate(async (instance) => {
  const { Package, ServicePackage } = require("./relation");
  const service = await ServicePackage.findOne({
    where: {
      id: instance.service_package_id,
    },
  });
  const package = await Package.findOne({
    where: {
      id: instance.package_id,
    },
  });

  if (service?.price && package) {
    package.price += service.price;
    await package.save();
  }
});

DetailServicePackage.beforeDestroy(async (instance) => {
  const { Package, ServicePackage } = require("./relation");
  // Logic before destroying a DetailServicePackage
  const service = await ServicePackage.findOne({
    where: {
      id: instance.service_package_id,
    },
  });
  const package = await Package.findOne({
    where: {
      id: instance.package_id,
    },
  });

  if (service?.price && package) {
    package.price -= service.price;
    package.price = Math.max(package.price, 0);
    await package.save();
  }
});

DetailServicePackage.beforeBulkDestroy(async (options) => {
  const { Package, ServicePackage } = require("./relation");

  const where = options.where;
  const services = await ServicePackage.findAll({
    where: {
      id: where.service_package_id,
    },
  });
  const packages = await Package.findAll({
    where: {
      id: where.package_id,
    },
  });

  for (const service of services) {
    for (const package of packages) {
      if (service?.price && package) {
        package.price -= service.price;
        await package.save();
      }
    }
  }
});

module.exports = { DetailServicePackage };
