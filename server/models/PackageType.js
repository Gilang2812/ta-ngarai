const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { generateCustomId } = require("../utils/generateId");
const { CustomError } = require("../utils/CustomError");

const PackageType = sequelize.define(
  "PackageType",
  {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: true,
    },
    type_name: { type: DataTypes.STRING(50), allowNull: false },
  },
  {
    tableName: "package_type",
    timestamps: false,
  }
);

PackageType.beforeCreate(async (instance) => {
  instance.id = await generateCustomId("T", PackageType, 5);
});
PackageType.beforeBulkDestroy(async (types) => {
  const { Package } = require("./relation");
  const where = types.where;
  const count = await Package.count({
    where: { type_id: where.id },
  });
  if (count > 0) {
    throw new CustomError(
      `Tidak dapat menghapus, masih digunakan di ${count} package.`,
      409
    );
  }
});
PackageType.beforeDestroy(async (type) => {
  const { Package } = require("./relation");

  const count = await Package.count({
    where: { type_id: type.id },
  });
  console.log("count test", count);
  if (count > 0) {
    throw new CustomError(
      `Tidak dapat menghapus, masih digunakan di ${count} package.`,
      409
    );
  }
});

module.exports = { PackageType };
