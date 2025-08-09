import {
  ReservationDetails,
  ReservationSchema,
} from "@/type/schema/ReservationSchema";
import {
  getReservationStatus,
  getReservationStatusClass,
} from "@/utils/common/getReservationStatus";
import { localeDayDate } from "@/utils/localeDate";
import React from "react";
import { FaLevelDownAlt } from "react-icons/fa";

type Props = {
  reservation?: ReservationSchema | ReservationDetails | null;
};

const ReservationStep = ({ reservation }: Props) => {
  return (
    reservation && (
      <table className="font-bold mt-4 [&_td]:pr-8">
        <tbody>
          <tr>
            <td>Status</td>
            <td className="flex items-center gap-1">
              :
              <span
                className={getReservationStatusClass(
                  getReservationStatus(reservation)
                )}
              >
                {getReservationStatus(reservation).replaceAll("-", " ")}
              </span>
            </td>
          </tr>
          {reservation.confirmation_date && (
            <tr>
              <td className="flex items-center gap-2">
                <FaLevelDownAlt /> Confirm Date
              </td>
              <td>: {localeDayDate(reservation.confirmation_date)}</td>
            </tr>
          )}
          {reservation.feedback && (
            <tr>
              <td>Feedback Admin</td>
              <td>: {`${reservation.feedback}`}</td>
            </tr>
          )}
          {reservation.deposit_date && (
            <tr>
              <td className="flex items-center gap-2">
                <FaLevelDownAlt /> DepositPayment
              </td>
              <td>: {localeDayDate(reservation.deposit_date)}</td>
            </tr>
          )}
          {reservation.deposit_date && (
            <tr>
              <td>Status Deposit Payment</td>
              <td>: Thank you. The deposit has been received.</td>
            </tr>
          )}
          {reservation.payment_date && (
            <tr>
              <td className="flex items-center gap-2">
                <FaLevelDownAlt /> Full Payment Reservation
              </td>
              <td>: {localeDayDate(reservation.payment_date)}</td>
            </tr>
          )}
          {reservation.payment_date && (
            <tr>
              <td>Status Full Payment</td>
              <td>: Thank you. The payment has been received.</td>
            </tr>
          )}

          {reservation.cancel_date && (
            <tr>
              <td className="flex items-center gap-2">
                <FaLevelDownAlt /> Cancel Reservation
              </td>
              <td>: {localeDayDate(reservation.cancel_date)}</td>
            </tr>
          )}
          {reservation.cancel_date && (
            <tr>
              <td>Status Cancell</td>

              <td>
                :{" "}
                {getReservationStatus(reservation) === "Cancelled-&-Refund"
                  ? "Admin will refund your payment."
                  : getReservationStatus(reservation) === "Cancelled" &&
                    "Reservation has been cancelled."}
              </td>
            </tr>
          )}
          {reservation.refund_date && (
            <tr>
              <td className="flex items-center gap-2">
                <FaLevelDownAlt /> Refund Reservation
              </td>
              <td>: {localeDayDate(reservation.refund_date)}</td>
            </tr>
          )}
          {reservation.refund_date && (
            <tr>
              <td>Status Cancell</td>

              <td>Thank you.</td>
            </tr>
          )}
          {getReservationStatus(reservation) === "Done" && (
            <tr>
              <td className="flex items-center gap-2">
                <FaLevelDownAlt /> Review
              </td>
              <td>: {localeDayDate(reservation.review)}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  );
};

export default ReservationStep;
