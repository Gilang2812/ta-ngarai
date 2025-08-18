const { CustomError } = require("../../utils/CustomError");
const {
  findReservations,
  findReservationById,
  createReservation,
  bulkCreateDetailReservation,
  findHomestayReservation,
  updateReservation,
  deleteReservation,
  findOneReservation,
} = require("./reservation.repository");
const dayjs = require("dayjs");
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
  if (!reservation) {
    throw new CustomError("Reservation not found", 404);
  }
  return reservation;
};

const insertReservation = async (data) => {
  const reservation = await createReservation(data);
  return reservation;
};

const bulkInsertDetailReservation = async ({
  selectedUnits = [],
  reservation_id,
  check_in,
  days_of_stay,
}) => {
  const newDetailReservations = selectedUnits.flatMap((unit) => {
    const detail = [];
    for (let i = 0; i < days_of_stay; i++) {
      detail.push({
        reservation_id,
        homestay_id: unit.homestay_id,
        unit_type: unit.unit_type,
        unit_number: unit.unit_number,
        date: dayjs(check_in).add(i, "day").format("YYYY-MM-DD"),
      });
    }
    return detail;
  });
  
  const detailReservations = await bulkCreateDetailReservation(
    newDetailReservations
  );
  return detailReservations;
};

const editReservation = async (key, data) => {
  const updatedDetail = await findOneReservation(key);
  await updateReservation(key, data);
  return updatedDetail.toJSON();
};

const destroyReservation = async (id) => {
  const deleted = await deleteReservation(id);
  return deleted;
};

module.exports = {
  getReservations,
  getReservationById,
  insertReservation,
  bulkInsertDetailReservation,
  getHomestayReservation,
  editReservation,
  destroyReservation,
};
