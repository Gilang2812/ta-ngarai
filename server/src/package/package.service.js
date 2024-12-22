const { findAllPackage, findPackage } = require("./package.repository")

const getAllPackage = async(query) => {
    
    const packages = await findAllPackage(query)
    return packages
}

const getPackage = async(id)=>{
    const package = await findPackage(id)
    return package
}

module.exports = { getAllPackage,getPackage }