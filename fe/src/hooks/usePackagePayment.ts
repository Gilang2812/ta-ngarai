import {
  ConfirmationFormSchema,
  DetailHomestayReservation,
  DetailReservationPackage,
  ReservationSchema,
} from "@/type/schema/ReservationSchema";
import { ReservationStatus } from "@/utils/common/getReservationStatus";
import dayjs from "dayjs";
import { useUpdateTokenReservation } from "@/features/reservation/useUpdateTokenReservation";
import { cornerAlert } from "@/utils/AlertUtils";
import { useUpdateReservation } from "@/features/reservation/useUpdateReservation";
import { getItemDetailsReservation } from "@/utils/common/getItemDetailsReservation";

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
  const { mutate: updateReservation, isPending: isUpdatingReservation } =
    useUpdateReservation<{
      id: string;
      payment_date?: string;
    }>({
      onSuccess: () => {
        refetchReservation();
      },
    });

  const { mutate: updateTokenReservation, isPending: isUpdatingToken } =
    useUpdateTokenReservation<
      ConfirmationFormSchema & {
        item_details?:
          | []
          | {
              id: string;
              name: string;
              price: number;
              quantity: number;
            }[];
        deposit: number;
        total_price: number;
        deposit_date?: string;
        payment_date?: string;
      }
    >({
      onSuccess: () => {
        refetchReservation();
      },
    });
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
          onSuccess: function (result) {
            if (originalStatus === "Payment-Required") {
              cornerAlert("Payment success: " + result.order_id);
              updateReservation({
                id: data.id,
                payment_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              });
            } else if (originalStatus === "Deposit-Required") {
              cornerAlert("Payment success: " + result.order_id);
              updateTokenReservation({
                id: data.id,
                status: data.status,
                feedback: data.feedback as string,
                item_details,
                deposit: data?.deposit ?? 0,
                total_price: (data?.total_price ?? 0) - (data?.deposit ?? 0),
                deposit_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              });
            }
          },
          onPending: function (result) {
            console.log("Payment Pending:", result);
          },
          onError: function (result) {
            console.error("Payment Error:", result);
          },
          onClose: function () {
            console.log("Payment Closed");
          },
        });
      }
    }
  };
  return {
    handlePayment,
    isPending: isUpdatingReservation || isUpdatingToken,
    item_details,
  };
};

export default usePackagePayment;
