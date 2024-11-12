const { findAllDetailPackages } = require("./detailPackage.repository")

const getAllDetailPackages = async(condition) =>{
    const detailPackage = await findAllDetailPackages(condition)
    return detailPackage
}

module.exports = {getAllDetailPackages}