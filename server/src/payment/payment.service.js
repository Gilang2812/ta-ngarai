const { snap, core } = require("../../config/midtrans");
const { updateCheckout } = require("../checkout/checkout.service");

const createTokenTransaction = async (body) => {
  const parameter = {
    transaction_details: {
      order_id: body.order_id,
      gross_amount: body.gross_amount,
    },
    item_details: body.item_details,
    callbacks: {
      finish: `${process.env.FRONTEND_URL}/web/reservation?tab=craft`,
      error: `${process.env.FRONTEND_URL}/web/reservation?tab=craft`,
      pending: `${process.env.FRONTEND_URL}/web/reservation?tab=craft`,
    },
  };

  const transaction = await snap.createTransaction(parameter);
  return transaction;
};

const createPayment = async (body) => {
  const transaction = await createTokenTransaction(body);

  console.log("transaction midtrans", transaction);
  await updateCheckout(
    { id: body.order_id },
    {
      checkout_date: new Date(),
      total_price: body.gross_amount,
      transaction_token: transaction.token,
    }
  );

  console.log("Transaction created:", transaction);

  return {
    success: true,
    token: transaction.token,
    redirect_url: transaction.redirect_url,
  };
};

const getPaymentStatus = async (orderId) => {
  try {
    const status = await core.transaction.status(orderId);
    return status;
  } catch (error) {
    const msg = error.message || "";

    // Cek pesan error Midtrans
    if (
      msg.includes("HTTP status code: 404") ||
      msg.includes("Transaction doesn't exist")
    ) {
      return null;
    }

    throw error;
  }
};

 
module.exports = {
  createPayment,
  getPaymentStatus,
  createTokenTransaction, 
};
