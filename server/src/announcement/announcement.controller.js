const { getAllAnnouncements } = require('./announcement.service');

const router = require('express').Router();

router.get('/', async (req,res)=>{
    try {
        const announcement = await getAllAnnouncements()
        return res.status(200).json(announcement)
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.message || 'Internal server error, ' );
    }
})

module.exports = router;