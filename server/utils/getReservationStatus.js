const dayjs = require('dayjs')
const getReservationStatus = (reservation) => {
  if (!reservation) {
    return "Unknown";
  }
  const status = reservation.status;
  const cancel = reservation.cancel && reservation.cancel_date;
  const rejected =
    status === 2 || (dayjs(reservation.check_in).isBefore(dayjs()) && !status); //rejected
  const accepted = status === 1; // awaiting payment
  const payDeposit =
    accepted && !reservation.deposit_date && reservation.token_of_deposit; //pay deposit

  const payFull =
    (!payDeposit || reservation.deposit === reservation.total_price) &&
    accepted &&
    !reservation.payment_date &&
    reservation.token_of_payment; //pay full
  const unReviewed =
    reservation.payment_date &&
    !reservation.review &&
    dayjs(reservation.check_in)
      .add(reservation.days_of_stay, "day")
      .isBefore(dayjs()); //unreviewed

  const cancelRefund =
    cancel &&
    (payDeposit || payFull) &&
    dayjs(reservation.cancel_date).isBefore(dayjs(reservation.check_in));

  const enjoy =
    accepted &&
    !reservation.cancel_date &&
    reservation.payment_date &&
    dayjs(reservation.check_in)
      .add(reservation.days_of_stay, "day")
      .isAfter(dayjs()); //enjoyed trip

  const waiting = !status && dayjs(reservation.check_in).isAfter(dayjs());
  const done = reservation.rating;
  // Return status in priority order
  if (rejected) return "Rejected";
  if (cancelRefund)
    return !reservation.refund_date ? "Cancelled-&-Refund" : "Refund-Success";
  if (cancel) return "Cancelled";
  if (done) return "Done";
  if (unReviewed) return "Unreviewed";
  if (enjoy) return "Enjoy-Trip";
  if (payFull) return "Payment-Required";
  if (payDeposit) return "Deposit-Required";
  if (waiting) {
    return "Awaiting-Approval";
  } else {
    return "Expired";
  }
};

module.exports = getReservationStatus;
