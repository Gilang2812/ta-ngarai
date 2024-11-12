const { getAllDetailPackages } = require('./detailPackage.service');

const router = require('express').Router();

router.get('/',async (req,res)=>{
    try {
        const conditions = {};
        const {package_id}  = req.query;
        package_id && (conditions.package_id = package_id);
        const detailPackages = await getAllDetailPackages(conditions)
        res.status(200).json(detailPackages)
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
    }
})
module.exports = router