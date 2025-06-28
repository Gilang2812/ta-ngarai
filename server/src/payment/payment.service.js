const { snap, core } = require("../../config/midtrans");
const { updateCheckout } = require("../checkout/checkout.service");
const createPayment = async (body) => {
  const parameter = {
    transaction_details: {
      order_id: body.order_id,
      gross_amount: body.gross_amount,
    },
    item_details: body.item_details,
    callbacks: {
      finish: `${process.env.FRONTEND_URL}/payment/success`,
      error: `${process.env.FRONTEND_URL}/payment/error`,
      pending: `${process.env.FRONTEND_URL}/payment/pending`,
    },
  };

  const transaction = await snap.createTransaction(parameter);

  await updateCheckout(
    { id: body.order_id },
    { checkout_date: new Date(), status: 2, total_price: body.gross_amount }
  );

  return {
    success: true,
    token: transaction.token,
    redirect_url: transaction.redirect_url,
  };
};

const getPaymentStatus = async (orderId) => {
  const status = await core.transaction.status(orderId);
  return status;
};
module.exports = { createPayment, getPaymentStatus };
