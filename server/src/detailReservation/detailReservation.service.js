const { findDetailReservations, findDetailReservationById, updateDetailReservation } = require("./detailReservation.repository")

const getDetailReservations= async ()=>{
    
    const detailReservations = await findDetailReservations()
    return detailReservations

}

const getDetailReservationById = async (reservation_id)=>{
    const detailReservation = await findDetailReservationById(reservation_id)
    return detailReservation
}

const editDetailReservation = async (key, data) => {
  const updatedDetail = await updateDetailReservation(key, data);
  return updatedDetail;
};
module.exports = { getDetailReservations, getDetailReservationById, editDetailReservation }