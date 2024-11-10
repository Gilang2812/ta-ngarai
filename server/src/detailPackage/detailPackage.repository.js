const { Op, Sequelize } = require("sequelize");
const { DetailPackage, PackageType } = require("../../models/relation");
const { Package } = require("../../models/relation");
const { PackageDay } = require("../../models/relation");

const findAllDetailPackages = async() => {
    const packages = await DetailPackage.findAll({
        where: {
            status: {
                [Op.ne]: null
            }
        },
        include: [{
            model: PackageDay,
            as: 'packageDay',
            required: true,
            where: Sequelize.literal('`packageDay`.`day` = `DetailPackage`.`day` AND `packageDay`.`package_id` = `DetailPackage`.`package_id`'), // Pastikan day dan package_id sama persis
            include: [{
                model: Package,
                as: 'package',
                include: {
                    model: PackageType,
                }
            }]
        }],
        group: ['package_id', 'day', 'activity']
    });

    return packages;
};

module.exports = { findAllDetailPackages };