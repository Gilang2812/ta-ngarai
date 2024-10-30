const { findGalleryTourisms } = require("./gallery.repository")

const getGalleryTourisms = async ()=>{
    const galleryTourism = await findGalleryTourisms()
    return galleryTourism
}
module.exports = {getGalleryTourisms}