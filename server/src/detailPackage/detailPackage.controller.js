const { getAllDetailPackages } = require('./detailPackage.service');

const router = require('express').Router();

router.get('/',async (req,res)=>{
    try {
        const detailPackages = await getAllDetailPackages()
        res.status(200).json(detailPackages)
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
    }
})
module.exports = router