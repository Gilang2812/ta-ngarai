const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PackageDay = sequelize.define(
  "PackageDay",
  {
    package_id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    day: {
      type: DataTypes.CHAR(2),
      primaryKey: true,
      allowNull: false,
    },
    description: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.TINYINT(4), allowNull: true, defaultValue: 0 },
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
    tableName: "package_day",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

PackageDay.beforeBulkDestroy(async (options) => {
  const { DetailPackage, Package } = require("./relation");
  const {
    calculateTotalObjectPrice,
  } = require("../utils/calculateTotalObjectPrice");

  // ambil semua instance yang akan dihapus
  const packageDays = await PackageDay.findAll({ where: options.where });

  for (const instance of packageDays) {
    const detail = await DetailPackage.findAll({
      where: {
        package_id: instance.package_id,
        day: instance.day,
      },
    });

    const pkg = await Package.findOne({ where: { id: instance.package_id } });

    const pricedObject = detail.filter(
      (item) => item.activity_type === "A" || item.activity_type === "FC"
    );

    const totalPrice = await calculateTotalObjectPrice(pricedObject);

    if (totalPrice && pkg) {
      pkg.price = Math.max(0, pkg.price - totalPrice);
      await pkg.save();
    }
  }
});

PackageDay.beforeDestroy(async (instance) => {
  const { DetailPackage, Package } = require("./relation");
  const {
    calculateTotalObjectPrice,
  } = require("../utils/calculateTotalObjectPrice");

  const detail = await DetailPackage.findAll({
    where: {
      package_id: instance.package_id,
      day: instance.day,
    },
  });
  const package = await Package.findOne({
    where: {
      id: instance.package_id,
    },
  });

  const pricedObject = detail.filter(
    (item) => item.activity_type === "A" || item.activity_type === "FC"
  );

  const totalPrice = await calculateTotalObjectPrice(pricedObject);
  if (totalPrice) {
    const newPrice =
      package.price - totalPrice < 0 ? 0 : package.price - totalPrice;
    package.price = newPrice;
    await package.save();
  }
});

module.exports = { PackageDay };
