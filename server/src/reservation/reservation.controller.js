const { getReservations, getReservationById } = require('./reservation.service');

const router = require('express').Router();

router.get('/',async (req,res)=>{
    try {
        const conditions = {}
        conditions.user_id = 19
        const reservation = await getReservations(conditions)
        res.status(200).json(reservation)
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
    }
})

router.get('/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const reservation = await getReservationById(id)
        res.status(200).json(reservation)
    } catch (error) {
        console.error(error);
        res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
    }
})


 module.exports =router