const dayjs = require("dayjs");
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
const imageUpload = require("../../middlewares/imageUploads");
const { isExpired } = require("../../utils/checkExpired");
const getReservationStatus = require("../../utils/getReservationStatus");
const { updateReservation } = require("./reservation.repository");

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
    if (!!reservation.token_of_deposit && !!reservation.deposit_date) {
      // if (getReservationStatus(reservation) === "Payment-Required") {
      //   if (
      //     !isExpired(
      //       reservation.deposit_date
      //         ? reservation.deposit_date
      //         : reservation.confirmation_date
      //     )
      //   ) {
      //     const paymentStatus = await getPaymentStatus(reservation.id + "-FULL");
      //     if (!paymentStatus) {
      //       const transaction = createTokenTransaction({
      //         order_id: `${reservation.id}-FULL`,
      //         gross_amount: reservation.total_price - reservation.deposit,
      //       });
      //       const token = transaction.token;
      //       await editReservation(
      //         { id: reservation.id },
      //         { token_of_payment: token }
      //       );
      //     }
      //   }
      // }
      // if (getReservationStatus(reservation) === "Deposit-Required") {
      //   const depositStatus = await getPaymentStatus(reservation.id + "-DEP");
      //   console.log("apakah ini terjadi");
      //   if (!depositStatus && !isExpired(reservation.deposit_date)) {
      //     console.log("lalu ada token baru");
      //     const transaction = createTokenTransaction({
      //       order_id: `${reservation.id}-DEP`,
      //       gross_amount: reservation.deposit,
      //     });
      //     const token = transaction.token;
      //     await editReservation(
      //       { id: reservation.id },
      //       { token_of_deposit: token }
      //     );
      //   }
      // }
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
    // if (getReservationStatus(reservation) === "Payment-Required") {
    //   if (
    //     !isExpired(
    //       reservation.deposit_date
    //         ? reservation.deposit_date
    //         : reservation.confirmation_date
    //     )
    //   ) {
    //     const paymentStatus = await getPaymentStatus(reservation.id + "-FULL");
    //     if (!paymentStatus) {
    //       const transaction = createTokenTransaction({
    //         order_id: `${reservation.id}-FULL`,
    //         gross_amount: reservation.total_price - reservation.deposit,
    //       });
    //       const token = transaction.token;
    //       await editReservation(
    //         { id: reservation.id },
    //         { token_of_payment: token }
    //       );
    //     }
    //   }
    // }
    // if (getReservationStatus(reservation) === "Deposit-Required") {
    //   const depositStatus = await getPaymentStatus(reservation.id + "-DEP");
    //   console.log("apakah ini terjadi");
    //   if (!depositStatus && !isExpired(deposit_date)) {
    //     console.log("lalu ada token baru");
    //     const transaction = createTokenTransaction({
    //       order_id: `${reservation.id}-DEP`,
    //       gross_amount: reservation.deposit,
    //     });
    //     const token = transaction.token;
    //     await editReservation(
    //       { id: reservation.id },
    //       { token_of_deposit: token }
    //     );
    //   }
    // }
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

    const newReservation = await insertReservation({
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
      reservation_id: newReservation.id,
      check_in,
      days_of_stay,
    });
    newReservation.detailUnits = newDetailReservation;
    const response = (unit = {
      ...newReservation.toJSON(),
      detailUnits: newDetailReservation,
    });
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", imageUpload().single("images"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const io = req.app.get("io");

    const { review_rating: rating, ...rest } = updatedData;
    const result = await editReservation({ id }, { ...rest, rating });
    io.to(`detailReservation:${id}`).emit("detailReservation", result);
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
      deposit_date,
      item_details,
      ...rest
    } = req.body;
    let transaction = null;
    const isFull = total_price === deposit;
    const isComplete = isFull || deposit_date;
    if (parseInt(status) != 2) {
      transaction = await createTokenTransaction({
        order_id: isComplete ? id + "-FULL" : id + "-DEP",
        gross_amount: isComplete ? total_price - deposit ?? 0 : deposit,
        // item_details,
      });
    }

    const io = req.app.get("io");
    console.log("ini token transaksi nya", transaction);
    const body = {
      rating,
      [isComplete ? "token_of_payment" : "token_of_deposit"]:
        transaction?.token,
      ...rest,
      status,
      confirmation_date: dayjs(),
    };

    const updatedReservation = await editReservation({ id }, body);
    io.to(`detailReservation:${id}`).emit(
      "detailReservation",
      updatedReservation
    );
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

router.patch("/recheck/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await getReservationById(id);
    const reservationStatus = getReservationStatus(reservation);
    const statusPayment = await getPaymentStatus(id + "-FULL");
    const statusDeposit = await getPaymentStatus(id + "-DEP");
    if (statusPayment || statusDeposit) {
      const statusDepositText =
        statusDeposit && getPaymentStatusText(statusDeposit);
      const statusPaymentText =
        statusPayment && getPaymentStatusText(statusPayment);

      if (
        reservationStatus === "Deposit-Required" ||
        reservationStatus === "Payment-Required"
      ) {
        if (
          reservation.token_of_deposit &&
          !reservation.deposit_date &&
          statusDepositText === "success"
        ) {
          const transaction = await createTokenTransaction({
            order_id: `${id}-FULL`,
            gross_amount: reservation.total_price - reservation.deposit,
          });
          await updateReservation(
            {
              id,
            },
            {
              token_of_payment: transaction.token,
              deposit_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            }
          );

          return res.json({ success: true, message: "deposit data updated" });
        }
        if (
          reservation.token_of_payment &&
          statusPaymentText === "success" &&
          !reservation.payment_date
        ) {
          await updateReservation(
            {
              id,
            },
            {
              payment_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            }
          );
          return res.json({
            success: true,
            message: "full payment data updated",
          });
        }
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
