const { getAllService } = require('./detailService.service');

const router = require('express').Router();

router.get('/', async (req,res,next)=>{
    try {
        const condition ={}
        const {package_id} = req.query
        package_id && (condition.package_id = package_id)
        const services = await getAllService(condition);
        res.status(200).json(services);
    } catch (error) {
        next(error)
    }
})

module.exports = router;