const { core } = require("../../config/midtrans");
const crypto = require("crypto");
const { createPayment, getPaymentStatus } = require("./payment.service");
const {
  takeCheckout,
  updateCheckout,
} = require("../checkout/checkout.service");
const getPaymentStatusText = require("../../utils/getPaymentStatusText");
const { updateShipping } = require("../shipping/shipping.service");
const { editShippingByCheckoutId } = require("../shipping/shipping.repository");
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
    const orderId = notification.order_id;
    const statusCode = notification.status_code;
    const grossAmount = notification.gross_amount;
    const signatureKey = notification.signature_key;

    // Verify signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const input = orderId + statusCode + grossAmount + serverKey;
    const hash = crypto.createHash("sha512").update(input).digest("hex");

    if (hash !== signatureKey) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    // Get transaction status
    const transactionStatus = await core.transaction.status(orderId);

    let paymentStatus = getPaymentStatusText(transactionStatus);

    // Update your database here based on paymentStatus
    console.log("Payment status:", paymentStatus, "for order:", orderId);

    res.json({ success: true });
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
    // const transactionStatus = await getPaymentStatus(id);
    const checkout = await takeCheckout({ id });
    const shippings = checkout.items.reduce((acc, item) => {
      if (!acc.includes(item.shipping.shipping_id)) {
        acc.push(item.shipping.shipping_id);
      }
      return acc;
    }, []);

    let status = await getPaymentStatus(checkout.id);
    {
    }
    if (!status) {
      status = "pending";
    }
    const paymentStatus = getPaymentStatusText(status);
    console.log("status:", status);
    console.log("Payment status:", paymentStatus);
    if (
      paymentStatus === "success" &&
      checkout.items[0].shipping.status === 1
    ) {
      await editShippingByCheckoutId(id, { status: 2 });
    }

    if (
      paymentStatus === "pending" &&
      checkout.items[0].shipping.status === 6 &&
      dayjs().isAfter(dayjs(checkout.checkout_date).add(24, "hour"))
    ) {
      await updateCheckout({ id }, { transaction_token: null });
    }
    res.json({
      order_id: id,
      total_pembayaran: checkout.total_price,
      waktu_transaksi: checkout.checkout_date,
      // status: paymentStatus,
      token: checkout.transaction_token,
      shippings: shippings,
      // checkout,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
