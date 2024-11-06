const { Op, Sequelize } = require("sequelize");
const { DetailPackage } = require("../../models/relation");
const { Package } = require("../../models/relation");
const { PackageDay } = require("../../models/relation");
const { getObjectById } = require("../object/object.service");

const findAllDetailPackages = async () => {
  const packages = await DetailPackage.findAll({
    where: {
      status: {
        [Op.ne]: null
      }
    },
    include: [
      {
        model: PackageDay,
        as: 'packageDay', 
        required:true,
        where: Sequelize.literal('`packageDay`.`day` = `DetailPackage`.`day` AND `packageDay`.`package_id` = `DetailPackage`.`package_id`'), // Pastikan day dan package_id sama persis
        include: [
          {
            model: Package,
            as: 'package'
          }
        ]
      }
    ],
    group: ['package_id', 'day', 'activity']
  });
  const seen = {};
  const testDay = packages.filter((p) => p.packageDay.package_id == "P0061");
  const testUnique = [...new Map (testDay.map((p)=>[p.packageDay.day,p])).values()]
  const day = [
    ...new Map(packages.map((p) => [p.packageDay.package_id, p])).values(),
  ];
  const unique = packages.filter(
    (item) =>
      !seen[item.packageDay.package.id] &&
      (seen[item.packageDay.package.id] = true)
  );
  return packages;
};

module.exports = { findAllDetailPackages };
