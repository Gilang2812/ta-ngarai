const { findDetailReservations, findDetailReservationById } = require("./detailReservation.repository")

const getDetailReservations= async ()=>{
    
    const detailReservations = await findDetailReservations()
    return detailReservations

}

const getDetailReservationById = async (reservation_id)=>{
    const detailReservation = await findDetailReservationById(reservation_id)
    return detailReservation
}
module.exports = { getDetailReservations,getDetailReservationById }