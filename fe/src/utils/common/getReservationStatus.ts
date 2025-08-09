import { ReservationDetails } from "@/type/schema/ReservationSchema";
import dayjs from "dayjs";
/**
 * Function to determine the reservation status for a homestay.
 * @param {ReservationDetails} reservation - The reservation details object.
 * @returns {string} - The status of the reservation.
 */
export type ReservationStatus =
  | "Accepted"
  | "Awaiting-Approval"
  | "Cancelled"
  | "Cancelled-&-Refund"
  | "Deposit-Required"
  | "Done"
  | "Enjoy-Trip"
  | "Expired"
  | "PayDeposit"
  | "PayFull"
  | "Payment-Required"
  | "Refund-Success"
  | "Rejected"
  | "Unknown"
  | "Unreviewed";

export const getReservationStatus = (
  reservation: ReservationDetails
): ReservationStatus => {
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
/**
 * Function to get CSS class based on reservation status.
 * @param {string} status - The reservation status.
 * @returns {string} - The CSS class name.
 */
export const getReservationStatusClass = (
  status: ReservationStatus
): string => {
  switch (status) {
    case "Cancelled-&-Refund":
      return "italic text-nowrap p-1 px-2 rounded font-semibold bg-red-600 text-white border-red-600";
    case "Refund-Success":
      return "italic text-nowrap p-1 px-2 rounded font-semibold bg-red-600 text-white border-red-600";
    case "Cancelled":
      return "italic text-nowrap p-1 px-2 rounded font-semibold bg-red-600 text-white border-red-600";
    case "Rejected":
      return "italic text-nowrap p-1 px-2 rounded font-semibold bg-red-600 text-white border-red-600";
    case "Deposit-Required":
      return "italic text-nowrap p-1 px-2 rounded font-semibold bg-cyan-400 text-black border-cyan-400";
    case "Payment-Required":
      return "italic text-nowrap p-1 px-2 rounded font-semibold bg-cyan-400 text-black border-cyan-400";
    case "Unreviewed":
      return "italic text-nowrap p-1 px-2 rounded font-semibold bg-black text-white border-black";
    case "Enjoy-Trip":
      return "italic text-nowrap p-1 px-2 rounded font-semibold bg-green-500 text-white border-green-500";
    case "Awaiting-Approval":
      return "italic text-nowrap p-1 px-2 rounded font-semibold bg-yellow-300 text-black border-yellow-300";
    case "Done":
      return "italic text-nowrap p-1 px-2 rounded font-semibold bg-green-600 text-white border-green-600";
    default:
      return "italic text-nowrap p-1 px-2 rounded font-semibold bg-red-600 text-white border-gray-600";
  }
};
