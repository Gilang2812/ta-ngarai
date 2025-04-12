const { getDetailReservations, getDetailReservationById } = require("./detailReservation.service");

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

router.get('/:reservation_id',async (req,res,next)=>{
    try {
        const {reservation_id} = req.params

        const detailReservation = await getDetailReservationById(reservation_id)
        res.status(200).json(detailReservation)
    } catch (error) {
        next(error)
    }
})
module.exports = router;
