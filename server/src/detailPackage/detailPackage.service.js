const { findAllDetailPackages } = require("./detailPackage.repository")

const getAllDetailPackages = async() =>{
    const detailPackage = await findAllDetailPackages()
    return detailPackage
}

module.exports = {getAllDetailPackages}