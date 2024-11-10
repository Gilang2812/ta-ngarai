const { getGalleryTourisms, getGalleryPackages } = require("./gallery.service");

const router = require("express").Router();

router.get("/tourism", async(req, res) => {
    try {
        const galleryTourism = await getGalleryTourisms();

        res.json(galleryTourism);
    } catch (error) {
        console.error(error);
        res
            .status(error.statusCode || 500)
            .json(error.message || "Internal server error, ");
    }
});

router.get("/package", async(req, res) => {
    try {
        let condition = {}
        const id = req.query.id && (condition.id = parseInt(req.query.id)) ;
        const custom = req.query.custom &&(condition.custom = req.query.custom.toString() ) ;

        const galleryPackages = await getGalleryPackages(condition);

        res.status(200).json(galleryPackages);
    } catch (error) {
        console.error(error);
        res
            .status(error.statusCode || 500)
            .json(error.messages || error.message || "Internal server error, ");
    }
});

module.exports = router;