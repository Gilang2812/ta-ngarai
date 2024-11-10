const { getAllPackage } = require('./package.service');

const router = require('express').Router();

router.get('/', async(req, res) => {
    try {
        const packages = await getAllPackage();

        res.status(200).json(packages)
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json(error.messages || error.message || 'Internal server error, ');
    }
})

module.exports = router;