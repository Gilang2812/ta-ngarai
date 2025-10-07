import {
  DetailHomestayReservation,
  DetailReservationPackage,
  ReservationSchema,
} from "@/types/schema/ReservationSchema";
import { ReservationStatus } from "@/utils/common/getReservationStatus";
import { cornerAlert, showLoadingAlert } from "@/utils/AlertUtils";
import { getItemDetailsReservation } from "@/utils/common/getItemDetailsReservation";
import { useRecheckReservation } from "@/features/reservation/useRecheckReservation";
import { useEffect } from "react";

type Props = {
  data?:
    | ReservationSchema
    | DetailHomestayReservation
    | DetailReservationPackage;
  refetchReservation: () => void;
  status: ReservationStatus;
};

const usePackagePayment = ({ data, refetchReservation, status }: Props) => {
  const item_details = getItemDetailsReservation(data?.detail || []);

  const handlePayment = () => {
    const originalStatus = status;
    if (data && (data?.token_of_deposit || data?.token_of_payment)) {
      const token =
        originalStatus === "Deposit-Required"
          ? data?.token_of_deposit
          : originalStatus === "Payment-Required"
          ? data?.token_of_payment
          : null;

      if (token) {
        window.snap.pay(token, {
          onSuccess: () => {
            refetchReservation();
            cornerAlert("Payment successful");
          },
        });
      }
    }
  };

  const { mutate: recheckReservation, isPending } = useRecheckReservation({
    onSuccess: (data) => {
      const response = data as { success: boolean; message: string };
      refetchReservation();
      cornerAlert(response?.message ?? "Recheck successful");
    },
  });

  useEffect(() => {
    if (isPending) {
      showLoadingAlert("Rechecking reservation...");
    }
  }, [isPending]);

  const handleRecheck = () => {
    if (data) {
      recheckReservation({ id: data.id });
    }
  };

  return {
    handlePayment,
    handleRecheck,
    item_details,
  };
};

export default usePackagePayment;
