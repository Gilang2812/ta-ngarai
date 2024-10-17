const { getTourismById } = require('./tourism.service');

const router = require('express').Router();

router.get('/', async (req,res)=>{
    try {
        const tourism =await getTourismById('KG01')

        return res.status(200).json(tourism) 
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.message || 'Internal server error, ' );
    }
})

module.exports = router