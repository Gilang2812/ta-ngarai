import Button from "@/components/common/Button";
import useAuth from "@/hooks/useAuth";
import useUserRole from "@/hooks/useUserRole";
import { ReservationStatus } from "@/utils/common/getReservationStatus";
import { FaMoneyBill } from "react-icons/fa";
type Props = {
  handlePayment: () => void;
  status: ReservationStatus;
};
export const PaymentButton = ({ handlePayment, status }: Props) => {
  const { isAdmin } = useUserRole();
  return (
    (status === "Payment-Required" || status === "Deposit-Required") &&
    !isAdmin && (
      <dl>
        <dt>Payment</dt>
        <dd onClick={handlePayment}>
          <Button className=" text-nowrap">
            <FaMoneyBill />
            {status === "Deposit-Required"
              ? "Pay Deposit Now"
              : status === "Payment-Required"
              ? "Pay Full Amount Now"
              : ""}
          </Button>
        </dd>
      </dl>
    )
  );
};
