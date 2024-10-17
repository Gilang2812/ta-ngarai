const express = require("express");
const { getAllGeoJSONData } = require("./geo.service");

const router = express.Router();

router.get("/",  async (req,res)=>{
    try {
        const geojson = await getAllGeoJSONData();
        res.json(geojson);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.message || 'Internal server error, ' );
    }
});

module.exports = router;
