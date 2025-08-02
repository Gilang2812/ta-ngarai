import { ReservationDetails } from "@/type/schema/ReservationSchema";
import dayjs from "dayjs";
/**
 * Function to determine the reservation status for a homestay.
 * @param {ReservationDetails} reservation - The reservation details object.
 * @returns {string} - The status of the reservation.
 */

export const getReservationStatus = (
  reservation: ReservationDetails
): string => {
  const status = reservation.status;
  const cancel =
    reservation.cancel && reservation.cancel_date && !reservation.refund_date;
  const rejected =
    status === 2 || (dayjs(reservation.check_in).isBefore(dayjs()) && !status); //rejected
  const accepted = status === 1; // awaiting payment
  const payDeposit = accepted && !reservation.deposit_date; //pay deposit
  const payFull = !payDeposit && !reservation.payment_date; //pay full
  const unReviewed =
    !payFull &&
    !reservation.review &&
    dayjs(reservation.check_in)
      .add(reservation.days_of_stay, "day")
      .isBefore(dayjs()); //unreviewed

  const enjoy = !unReviewed && !reservation.cancel_date; //enjoyed trip
  const cancelRefund =
    cancel &&
    (payDeposit || payFull) &&
    dayjs(reservation.cancel_date).isBefore(dayjs(reservation.check_in));

  const waiting = !status && dayjs(reservation.check_in).isAfter(dayjs());

  // Return status in priority order
  if (cancelRefund) return "Cancelled-&-Refund";
  if (cancel) return "Cancelled";
  if (rejected) return "Rejected";
  if (payDeposit) return "Deposit-Required";
  if (payFull) return "Payment-Required";
  if (unReviewed) return "Unreviewed";
  if (enjoy) return "Enjoyed-Trip";
  if (waiting) return "Awaiting-Approval";

  return "Done";
};
/**
 * Function to get CSS class based on reservation status.
 * @param {string} status - The reservation status.
 * @returns {string} - The CSS class name.
 */
export const getReservationStatusClass = (status: string): string => {
  switch (status) {
    case "Cancelled-&-Refund":
      return "p-1 rounded font-normal bg-orange-100 text-orange-800 border-orange-200";
    case "Cancelled":
      return "p-1 rounded font-normal bg-red-100 text-red-800 border-red-200";
    case "Rejected":
      return "p-1 rounded font-normal bg-red-100 text-red-800 border-red-200";
    case "Deposit-Required":
      return "p-1 rounded font-normal bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Payment-Required":
      return "p-1 rounded font-normal bg-amber-100 text-amber-800 border-amber-200";
    case "Unreviewed":
      return "p-1 rounded font-normal bg-purple-100 text-purple-800 border-purple-200";
    case "Enjoyed-Trip":
      return "p-1 rounded font-normal bg-green-100 text-green-800 border-green-200";
    case "Awaiting-Approval":
      return "p-1 rounded font-normal bg-blue-100 text-blue-800 border-blue-200";
    case "Done":
      return "p-1 rounded font-normal bg-green-500 text-white border-green-600";
    default:
      return "p-1 rounded font-normal bg-gray-50 text-gray-600 border-gray-600";
  }
};
