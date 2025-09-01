import Button from "@/components/common/Button";
import useUserRole from "@/hooks/useUserRole";
import { ReservationStatus } from "@/utils/common/getReservationStatus";

import { RefreshCw } from "lucide-react";
type Props = {
  handleRecheck: () => void;
  status: ReservationStatus;
};
export const CheckStatus = ({ handleRecheck, status }: Props) => {
  const { isAdmin } = useUserRole();
  return (
    !isAdmin &&
    (status === "Deposit-Required" || status === "Payment-Required") && (
      <Button
        onClick={handleRecheck}
        variant="regWarning"
        className=" text-nowrap"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        ReCheck status
      </Button>
    )
  );
};
