const { GalleryPackage } = require("../../models/GalleryPackage")
const { GalleryTourism } = require("../../models/GalleryTourismModel")
const { TourismVillage, Package, PackageType } = require("../../models/relation")

const findGalleryTourisms = async() => {
    const tourisms = await GalleryTourism.findAll()
    return tourisms
}

const findGalleryPackages = async(custom) => { 
    const packages = await GalleryPackage.findAll({
        include: {
            model: Package,
            include: { model: PackageType }, 
            where:custom
        }
    })
    return packages
}

module.exports = { findGalleryTourisms, findGalleryPackages }