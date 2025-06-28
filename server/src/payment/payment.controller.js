const { snap, core } = require("../../config/midtrans");
const crypto = require("crypto");
const { createPayment, getPaymentStatus } = require("./payment.service");
const { updateCheckout } = require("../checkout/checkout.service");
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

    let paymentStatus = "";
    if (transactionStatus.transaction_status === "capture") {
      if (transactionStatus.fraud_status === "challenge") {
        paymentStatus = "challenge";
      } else if (transactionStatus.fraud_status === "accept") {
        paymentStatus = "success";
      }
    } else if (transactionStatus.transaction_status === "settlement") {
      paymentStatus = "success";
    } else if (transactionStatus.transaction_status === "deny") {
      paymentStatus = "deny";
    } else if (
      transactionStatus.transaction_status === "cancel" ||
      transactionStatus.transaction_status === "expire"
    ) {
      paymentStatus = "failure";
    } else if (transactionStatus.transaction_status === "pending") {
      paymentStatus = "pending";
    }

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

    res.json({
      success: true,
      data: status,
    });
  } catch (error) {
    console.error("Error getting transaction status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get transaction status",
    });
  }
});

module.exports = router;
