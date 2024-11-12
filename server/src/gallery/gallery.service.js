const { findGalleryTourisms, findGalleryPackages } = require("./gallery.repository")

const getGalleryTourisms = async() => {
    const galleryTourism = await findGalleryTourisms()
    return galleryTourism
}

const getGalleryPackages = async(custom ) => {
    const galleryPackages = await findGalleryPackages( custom  )
    return galleryPackages
}
module.exports = { getGalleryTourisms, getGalleryPackages }