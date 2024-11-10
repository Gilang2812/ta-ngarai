const { findAllPackage } = require("./package.repository")

const getAllPackage = async() => {
    const packages = await findAllPackage()
    return packages
}

module.exports = { getAllPackage }