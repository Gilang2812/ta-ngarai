const { Package } = require("../../models/relation")

const findAllPackage = async() => {
    const packages = await Package.findAll({ where: { status: 1, custom: 0 } })
    return packages
}

module.exports = { findAllPackage }