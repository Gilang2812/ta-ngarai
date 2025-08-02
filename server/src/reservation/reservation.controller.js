const { getCountPackageDays } = require("../package/package.service");
const {
  getReservations,
  getReservationById,
  insertReservation,
  bulkInsertDetailReservation,
  getHomestayReservation,
} = require("./reservation.service");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const conditions = {};
    conditions.user_id = 19;
    const reservation = await getReservations(conditions);
    return res.status(200).json(reservation);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await getReservationById(id);

    return res.status(200).json(reservation);
  } catch (error) {
    next(error);
  }
});

router.get("/homestay/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await getHomestayReservation(id);
    return res.status(200).json(reservation);
  } catch (error) {
    next();
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const {
      selectedUnits,
      package_id,
      check_in,
      total_people,
      note,
      check_in_time,
      total_deposit: deposit,
      total_price_reservation: total_price,
    } = req.body;
    let days_of_stay = req.body.day_of_stay;

    if (package_id) {
      days_of_stay = await getCountPackageDays(package_id);
    }

    console.log("Request Body Reservation:", req.body);

    const homestayUnitsReservation = await insertReservation({
      user_id: req.user.id,
      package_id,
      request_date: new Date(),
      check_in: `${check_in} ${check_in_time}`,
      total_people,
      days_of_stay,
      note,
      deposit,
      total_price,
    });

    const newDetailReservation = await bulkInsertDetailReservation({
      selectedUnits,
      reservation_id: homestayUnitsReservation.id,
      check_in,
    });
    homestayUnitsReservation.detailUnits = newDetailReservation;
    const response = (unit = {
      ...homestayUnitsReservation.dataValues,
      detailUnits: newDetailReservation,
    });
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
