const { getObjectById } = require('./object.service');

const router = require('express').Router();

router.get('/:object/:id',async (req,res,next)=>{
    try {
        const {object,id} = req.params
        const objects =await getObjectById(object,id) 

        res.status(200).json(objects)
    } catch (error) {
        next(error)
    }
})


module.exports = router