const { getObjectById } = require('./object.service');

const router = require('express').Router();

router.get('/:object/:id',async (req,res)=>{
    try {
        const {object,id} = req.params
        const objects =await getObjectById(object,id) 

        res.status(200).json(objects)
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
    }
})


module.exports = router