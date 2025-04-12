const { getAllPackage, getPackage } = require('./package.service');

const router = require('express').Router();

router.get('/', async(req, res) => {
    try {
        const query  = req.query
        query.package = query.package ==='true'
        query.service = query.service ==='true'
        query.gallery = query.gallery ==='true'
        
        const packages = await getAllPackage(query);

        res.status(200).json(packages)
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json(error.messages || error.message || 'Internal server error, ');
    }
})

router.get('/:id', async (req,res,next)=>{
    try {
        const {id} = req.params
        const package = await getPackage(id)
        res.status(200).json(package)
    } catch (error) {
        next(error)
    }
})

module.exports = router;