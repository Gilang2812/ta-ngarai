const {
  findReservations,
  findReservationById,
  createReservation,
  bulkCreateDetailReservation,
  findHomestayReservation,
} = require("./reservation.repository");

const getReservations = async (condition) => {
  const reservations = await findReservations(condition);
  return reservations;
};

const getReservationById = async (condition) => {
  const reservations = await findReservationById(condition);
  return reservations;
};

const getHomestayReservation = async (id) => {
  const reservation = await findHomestayReservation(id);
  return reservation;
};

const insertReservation = async (data) => {
  console.log("Insert Reservation Data:", data);
  const reservation = await createReservation(data);
  return reservation;
};

const bulkInsertDetailReservation = async ({
  selectedUnits = [],
  reservation_id,
  check_in,
}) => {
  const newDetailReservations = selectedUnits.map((unit) => ({
    reservation_id,
    homestay_id: unit.homestay_id,
    unit_type: unit.unit_type,
    unit_number: unit.unit_number,
    date: check_in,
  }));

  console.log("bulk insert ", newDetailReservations);
  const detailReservations = await bulkCreateDetailReservation(
    newDetailReservations
  );
  return detailReservations;
};

module.exports = {
  getReservations,
  getReservationById,
  insertReservation,
  bulkInsertDetailReservation,
  getHomestayReservation,
};
