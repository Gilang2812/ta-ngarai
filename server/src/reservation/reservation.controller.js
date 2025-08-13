const getDaysOfStay = require("../../utils/getDaysOfStay");
const getPaymentStatusText = require("../../utils/getPaymentStatusText");
const { verifyToken } = require("../middlewares/authentication");
const { getCountPackageDays } = require("../package/package.service");
const {
  createTokenTransaction,
  getPaymentStatus,
} = require("../payment/payment.service");
const {
  getReservations,
  getReservationById,
  insertReservation,
  bulkInsertDetailReservation,
  getHomestayReservation,
  editReservation,
  destroyReservation,
} = require("./reservation.service");

const router = require("express").Router();

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const conditions = {};

    const reservation = await getReservations(conditions);

    const data = await Promise.all(
      reservation.map(async (item) => {
        const days_of_stay = await getDaysOfStay(item);
        let itemParse = item.toJSON();
        return { days_of_stay, ...itemParse };
      })
    );
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.get("/user", verifyToken, async (req, res, next) => {
  try {
    const conditions = {};
    conditions.user_id = req.user.id;

    const reservation = await getReservations(conditions);

    const data = await Promise.all(
      reservation.map(async (item) => {
        const days_of_stay = await getDaysOfStay(item);
        let itemParse = item.toJSON();

        return { days_of_stay, ...itemParse };
      })
    );
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await getReservationById(id);
    const paymentStatus = await getPaymentStatus(reservation.id + "-FULL");
    const depositStatus = await getPaymentStatus(reservation.id + "-DEP");
    if (paymentStatus || depositStatus) {
      const statusPayment =
        paymentStatus && getPaymentStatusText(paymentStatus);
      const statusDeposit =
        depositStatus && getPaymentStatusText(depositStatus);
      if (statusPayment === "success" && !reservation.payment_date) {
        itemParse = await editReservation(
          { id: reservation.id },
          { payment_date: new Date() }
        );
      }
      if (statusDeposit === "success" && !reservation.deposit_date) {
        itemParse = await editReservation(
          { id: reservation.id },
          { deposit_date: new Date() }
        );
      }

      if (
        !reservation.deposit_channel &&
        (statusDeposit === "success" || statusPayment === "success")
      ) {
        itemParse = await editReservation(
          { id: reservation.id },
          {
            deposit_channel:
              depositStatus?.payment_type || paymentStatus?.payment_type,
          }
        );
      }

      if (reservation.deposit_date && !reservation.token_of_payment) {
        const transaction = await createTokenTransaction({
          order_id: reservation.id + "-FULL",
          gross_amount: reservation.total_price - reservation.deposit,
        });
        itemParse = await editReservation(
          { id: reservation.id },
          { token_of_payment: transaction?.token }
        );
      }
    }

    return res.status(200).json(reservation);
  } catch (error) {
    next(error);
  }
});

router.get("/homestay/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await getHomestayReservation(id);
    const paymentStatus = await getPaymentStatus(reservation.id + "-FULL");
    const depositStatus = await getPaymentStatus(reservation.id + "-DEP");
    if (depositStatus || paymentStatus) {
      const statusPayment =
        paymentStatus && getPaymentStatusText(paymentStatus);
      const statusDeposit =
        depositStatus && getPaymentStatusText(depositStatus);
      if (statusPayment === "success" && !reservation.payment_date) {
        itemParse = await editReservation(
          { id: reservation.id },
          { payment_date: new Date() }
        );
      }
      if (statusDeposit === "success" && !reservation.deposit_date) {
        itemParse = await editReservation(
          { id: reservation.id },
          { deposit_date: new Date() }
        );
      }

      if (
        !reservation.deposit_channel &&
        (statusDeposit === "success" || statusPayment === "success")
      ) {
        itemParse = await editReservation(
          { id: reservation.id },
          {
            deposit_channel:
              depositStatus?.payment_type || paymentStatus?.payment_type,
          }
        );
      }

      if (reservation.deposit_date && !reservation.token_of_payment) {
        const transaction = await createTokenTransaction({
          order_id: reservation.id + "-FULL",
          gross_amount: reservation.total_price - reservation.deposit,
        });
        itemParse = await editReservation(
          { id: reservation.id },
          { token_of_payment: transaction?.token }
        );
      }
    }

    return res.status(200).json(reservation);
  } catch (error) {
    next(error);
  }
});

router.get("/review/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await getReservationById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json(reservation);
  } catch (error) {
    next(error);
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
    let days_of_stay = req.body.days_of_stay;

    if (package_id) {
      days_of_stay = await getCountPackageDays(package_id);
    }

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
      days_of_stay,
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

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const { review_rating: rating, ...rest } = updatedData;
    const result = await editReservation({ id }, { ...rest, rating });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/payment/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      review_rating: rating,
      total_price,
      deposit,
      status,
      item_details,
      ...rest
    } = req.body;
    let transaction = null;
    const isFull = total_price === deposit;
    console.log("statust payments", parseInt(status) !== 2);
    console.log("statust payments benar", parseInt(status) === 2);
    console.log("statust payments asli", typeof status);
    if (parseInt(status) !== 2) {
      transaction = await createTokenTransaction({
        order_id: isFull ? id + "-FULL" : id + "-DEP",
        gross_amount: isFull ? total_price : deposit,
        // item_details,
      });
    }

    const body = {
      rating,
      [isFull ? "token_of_payment" : "token_of_deposit"]: transaction?.token,
      ...rest,
      status,
    };

    const updatedReservation = await editReservation({ id }, body);
    res.status(200).json(updatedReservation);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await destroyReservation(id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
