const { Op, Sequelize } = require("sequelize");
const { DetailPackage, PackageType } = require("../../models/relation");
const { Package } = require("../../models/relation");
const { PackageDay } = require("../../models/relation");

const findAllDetailPackages = async (condition) => {
  
  console.log(condition);
  const packages = await DetailPackage.findAll({
    where: condition,
    include: [
      {
        model: PackageDay,
        as: "packageDay",
        required: true,
        where: Sequelize.literal(
          "`packageDay`.`day` = `DetailPackage`.`day` AND `packageDay`.`package_id` = `DetailPackage`.`package_id`"
        ), // Pastikan day dan package_id sama persis
        include: [
          {
            model: Package,
            as: "package",
            where:{status: { [Op.ne]: null }},
            include: {
              model: PackageType,
            },
          },
        ],
      },
    ],
    group: ["package_id", "day", "activity"],
  });

  return packages;
};

module.exports = { findAllDetailPackages };
