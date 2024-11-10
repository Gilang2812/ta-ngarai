const { GalleryPackage } = require("../../models/GalleryPackage")
const { GalleryTourism } = require("../../models/GalleryTourismModel")
const { TourismVillage, Package, PackageType } = require("../../models/relation")

const findGalleryTourisms = async() => {
    const tourisms = await GalleryTourism.findAll()
    return tourisms
}

const findGalleryPackages = async(custom) => {
    const query = custom.custom ? custom : {}
    console.log(custom)
    const packages = await GalleryPackage.findAll({
        include: {
            model: Package,
            include: { model: PackageType },
            where: query
        }
    })
    return packages
}

module.exports = { findGalleryTourisms, findGalleryPackages }