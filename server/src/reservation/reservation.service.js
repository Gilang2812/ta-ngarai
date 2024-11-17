const { findReservations, findReservationById } = require("./reservation.repository")

const getReservations = async (condition)=>{
        const reservations = await findReservations(condition)
        return reservations
}

const getReservationById = async (condition)=>{
    const reservations = await findReservationById(condition)
    return reservations
}

module.exports ={getReservations,getReservationById}