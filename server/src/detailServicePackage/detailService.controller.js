const { getAllService } = require('./detailService.service');

const router = require('express').Router();

router.get('/', async (req,res)=>{
    try {
        const condition ={}
        const {package_id} = req.query
        package_id && (condition.package_id = package_id)
        const services = await getAllService(condition);
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
    }
})

module.exports = router;