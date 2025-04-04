const { Reservation } = require('../../models/ReservationModel');
const { handleInput } = require('../../utils/handleInput');
const { getReservations, getReservationById } = require('./reservation.service');
const { reservationSchema } = require('./reservation.validation');

const router = require('express').Router();

router.get('/',async (req,res)=>{
    try {
        const conditions = {}
        conditions.user_id = 19
        const reservation = await getReservations(conditions)
        return res.status(200).json(reservation)
    } catch (error) {
        console.error(error);
        return res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
    }
})

router.get('/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const reservation = await getReservationById(id)
    
        return res.status(200).json(reservation)
    } catch (error) {
        console.error(error);
        return res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
    }
})

router.post('/create',async (req,res)=>{
    try {
        const {selectedUnits,user_id,package_id,request_date,check_in,total_people,note,total_deposit:deposit,total_price} = req.body
        
        
        handleInput(req.body,reservationSchema)
        const homestayUnitsReservation= await Reservation.create({
            user_id:1,
            package_id,
            request_date:new Date(),
            check_in,
            total_people,note,deposit,total_price
        })
        req.body.selectedUnits.map(async (unit)=>{
           
        })
        console.log(req.body)
        return res.status(200).json(homestayUnitsReservation)
    } catch (error) {
        console.error(error.message);
        return res.status(error.statusCode||500).json(error.messages ||error.message|| 'Internal server error, ' );
    }finally{
        console.log(req.body)
    }
})


 module.exports =router