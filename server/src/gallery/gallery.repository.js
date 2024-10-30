const { GalleryTourism } = require("../../models/GalleryTourismModel")
const { TourismVillage } = require("../../models/relation")

const findGalleryTourisms = async ()=>{
    const tourisms = await GalleryTourism.findAll()
    return tourisms
}

module.exports = {findGalleryTourisms}