const { findGalleryTourisms, findGalleryPackages } = require("./gallery.repository")

const getGalleryTourisms = async() => {
    const galleryTourism = await findGalleryTourisms()
    return galleryTourism
}

const getGalleryPackages = async(custom,id) => {
    const galleryPackages = await findGalleryPackages( custom ,id)
    return galleryPackages
}
module.exports = { getGalleryTourisms, getGalleryPackages }