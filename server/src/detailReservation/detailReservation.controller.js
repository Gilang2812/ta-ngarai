const {
  getDetailReservations,
  getDetailReservationById,
  editDetailReservation,
} = require("./detailReservation.service");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const detailReservations = await getDetailReservations();
    res.status(200).json(detailReservations);
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(error.messages || error.message || "Internal server error, ");
  }
});

router.get("/:reservation_id", async (req, res, next) => {
  try {
    const { reservation_id } = req.params;

    const detailReservation = await getDetailReservationById(reservation_id);
    res.status(200).json(detailReservation);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:date/:reservation_id/:homestay_id/:unit_type/:unit_number",
  async (req, res, next) => {
    try {
      const { date, reservation_id, homestay_id, unit_type, unit_number } =
        req.params;
      const data = req.body;
      console.log("Data to update:", data);
      const { review_rating: rating, ...rest } = data;

      const updatedDetail = await editDetailReservation(
        { date, reservation_id, homestay_id, unit_type, unit_number },
        {
          ...rest,
          rating,
        }
      );
      res.status(200).json(updatedDetail);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
