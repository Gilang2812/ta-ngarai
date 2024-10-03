const express = require('express');
var router = express.Router();

const { getAllHomestay, getHomestay } = require("./homestay.service");

router.get('/', async (req,res)=>{
    try {
        const homestays = await getAllHomestay()
        res.json(200, homestays);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.message||'Internal server error, ' );
    }
}
)

router.post('/',async (req,res)=>{
    try {
        const homestay = await getHomestay('HO001');
        
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json( error.message||'Internal server error, ' );
    }
} )

module.exports = router