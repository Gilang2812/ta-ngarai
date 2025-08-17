import useUserRole from "@/hooks/useUserRole";
import { ReservationStatus } from "@/utils/common/getReservationStatus";
import Payment from "./Payment";
type Props = {
  handlePayment: () => void;
  status: ReservationStatus;
};
export const PaymentButton = ({ handlePayment, status }: Props) => {
  const { isAdmin } = useUserRole();
  console.log("status user", isAdmin);
  return (
    (status === "Payment-Required" || status === "Deposit-Required") &&
    !isAdmin && (
      <dl>
        <dt>Payment</dt>
        <dd>
          <Payment handlePayment={handlePayment} status={status} />
        </dd>
      </dl>
    )
  );
};
