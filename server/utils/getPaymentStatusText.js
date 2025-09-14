const getPaymentStatusText = (transactionStatus) => {
  let paymentStatus = "";
  if (transactionStatus?.transaction_status === "capture") {
    if (transactionStatus?.fraud_status === "challenge") {
      paymentStatus = "challenge";
    } else if (transactionStatus?.fraud_status === "accept") {
      paymentStatus = "success";
    }
  } else if (transactionStatus?.transaction_status === "settlement") {
    paymentStatus = "success";
  } else if (transactionStatus?.transaction_status === "deny") {
    paymentStatus = "deny";
  } else if (
    transactionStatus?.transaction_status === "cancel" ||
    transactionStatus?.transaction_status === "expire"
  ) {
    paymentStatus = "failure";
  } else if (transactionStatus?.transaction_status === "pending") {
    paymentStatus = "pending";
  } else {
    paymentStatus = null;
  }

  return paymentStatus;
};

module.exports = getPaymentStatusText;
