const { core } = require("../../config/midtrans");
const crypto = require("crypto");
const {
  createPayment,
  getPaymentStatus,
  createTokenTransaction,
} = require("./payment.service");
const {
  takeCheckout,
  updateCheckout,
  updateCheckoutStatus,
} = require("../checkout/checkout.service");
const getPaymentStatusText = require("../../utils/getPaymentStatusText");
const { updateShipping } = require("../shipping/shipping.service");
const { editShippingByCheckoutId } = require("../shipping/shipping.repository");
const { isExpired } = require("../../utils/checkExpired");
const dayjs = require("dayjs");
const {
  updateReservation,
  findOneReservation,
} = require("../reservation/reservation.repository");
const router = require("express").Router();

router.post("/create", async (req, res) => {
  try {
    const { order_id, gross_amount, item_details } = req.body;
    console.log(item_details);
    const transaction = await createPayment({
      order_id,
      gross_amount,
      item_details,
    });

    res.json({
      success: true,
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error("Error creating transaction:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create transaction",
      error: error.message,
    });
  }
});

router.post("/notification", async (req, res) => {
  try {
    const notification = req.body;
    console.log("test ini ketika di close");
    const status = await core.transaction.notification(notification);
    let paymentStatus = getPaymentStatusText(status);

    console.log("ini status notifikasi", status);
    console.log("ini status teksnya", paymentStatus);
    const fullOrderId = req.body.order_id.split("-");
    const orderId = fullOrderId[0];
    const orderIdSuffix = fullOrderId[1] || null;
    const payment_type = status.payment_type;
    const settle_time = status.settle_time;
    const io = req.app.get("io");
    if (String(orderId).startsWith("R")) {
      io.to(`detailReservation:${orderId}`).emit("detailReservation", status);
      if (paymentStatus === "success") {
        if (orderIdSuffix === "DEP") {
          const reservation = await findOneReservation({ id: orderId });
          const transaction = await createTokenTransaction({
            id: `${orderId}-FULL`,
            gross_amount: reservation.total_price - reservation.deposit,
          });
          await updateReservation(
            {
              id: orderId,
            },
            {
              token_of_payment: transaction.token,
              deposit_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            }
          );
        }
        if (orderIdSuffix === "FULL") {
          await updateReservation(
            {
              id: orderId,
            },
            {
              payment_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            }
          );
        }
      }
    } else {
      const checkout = await takeCheckout({ id: orderId });
      const shippings = checkout?.items?.reduce((acc, item) => {
        if (!acc.includes(item?.shipping?.shipping_id)) {
          acc.push(item?.shipping?.shipping_id);
        }
        return acc;
      }, []);
      io.to(`user-history`).emit("user-history", status);

      // Get transaction status
      switch (paymentStatus) {
        case "challenge":
          await updateCheckoutStatus({
            id: orderId,
            payment_type: payment_type,
            settlement_time: settle_time,
            shippings: shippings,
            status: 2,
          });
          break;
        case "success":
          await updateCheckoutStatus({
            id: orderId,
            payment_type: payment_type,
            settlement_time: settle_time,
            shippings: shippings,
            status: 2,
          });
          break;
        case "deny":
          await updateCheckoutStatus({
            id: orderId,
            payment_type: payment_type,
            settlement_time: settle_time,
            shippings: shippings,
            status: 6,
          });
          break;
        case "failure":
          await updateCheckoutStatus({
            id: orderId,
            payment_type: payment_type,
            settlement_time: settle_time,
            shippings: shippings,
            status: 6,
          });
          break;
        case "pending":
          // Update your database here based on paymentStatus
          await updateCheckoutStatus({
            id: orderId,
            payment_type: payment_type,
            settlement_time: settle_time,
            shippings: shippings,
            status: 1,
          });
          break;
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error handling notification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to handle notification",
    });
  }
});

router.get("/status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const status = await getPaymentStatus(orderId);

    res.json(status);
  } catch (error) {
    console.error("Error getting transaction status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get transaction status",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const checkout = await takeCheckout({ id });
    const shippings =
      checkout?.items?.reduce((acc, item) => {
        if (!acc.includes(item?.shipping?.shipping_id)) {
          acc.push(item?.shipping?.shipping_id);
        }
        return acc;
      }, []) || [];

    let status = await getPaymentStatus(checkout?.id);
    let token = checkout?.transaction_token;
    if (!status) {
      status = "pending";
      if (!isExpired(checkout?.checkout_date)) {
        const newToken = await createTokenTransaction({
          order_id: `${checkout?.id}-${dayjs().format("YYYYMMDDHHmmss")}`,
          gross_amount: checkout?.items?.reduce(
            (acc, item) => acc + item.detailCraft.price * item.jumlah,
            0
          ),
          item_details:
            checkout?.items?.map((item) => ({
              id: item?.id,
              name: `${item?.detailCraft?.variant?.craft?.name} ${item?.detailCraft?.variant?.name}`,
              price: item?.detailCraft?.price,
              quantity: item?.jumlah,
            })) || [],
        });

        token = newToken.token;
      }
    }
    const paymentStatus = getPaymentStatusText(status);

    if (
      paymentStatus === "pending" &&
      checkout?.items?.[0]?.shipping?.status === 6 &&
      isExpired(checkout?.checkout_date)
    ) {
      if (checkout?.transaction_token) {
        await updateCheckout({ id }, { transaction_token: null });
      }
    }
    res.json({
      order_id: id,
      total_pembayaran: checkout?.total_price,
      waktu_transaksi: checkout?.checkout_date,
      token: token,
      shippings: shippings,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
