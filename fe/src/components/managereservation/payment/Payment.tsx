import Button from "@/components/common/Button";
import useUserRole from "@/hooks/useUserRole";
import { ReservationStatus } from "@/utils/common/getReservationStatus";
import React from "react";
import { FaMoneyBill } from "react-icons/fa6";

type Props = {
  handlePayment: () => void;
  status: ReservationStatus;
};

const Payment = ({ handlePayment, status }: Props) => {
  const { isAdmin } = useUserRole();
  return (
    !isAdmin && (
      <Button onClick={handlePayment} className=" text-nowrap">
        <FaMoneyBill />
        {status === "Deposit-Required"
          ? "Pay Deposit Now"
          : status === "Payment-Required"
          ? "Pay Full Amount Now"
          : ""}
      </Button>
    )
  );
};

export default Payment;
