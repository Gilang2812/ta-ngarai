const { getGalleryTourisms } = require('./gallery.service');

const router = require('express').Router();

router.get('/tourism',async (req,res)=>{
    try {
        const galleryTourism = await getGalleryTourisms();

        res.json(galleryTourism)
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.message || 'Internal server error, ' );
    }
})

module.exports = router