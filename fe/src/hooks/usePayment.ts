import { useUpdateStatus } from "@/features/web/checkout/useUpdateStatus";
import { useGetPaymentById } from "@/features/web/payment/useGetPaymentById";
import { cornerAlert, cornerError } from "@/utils/AlertUtils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const usePayment = (id: string) => {
  const { data: payment, isLoading } = useGetPaymentById(id);
  const router = useRouter();
  const { mutateAsync: updateStatus } = useUpdateStatus({
    onSuccess: () => {},
  });
  useEffect(() => {
    if (payment?.token) {
      window?.snap?.pay(payment.token, {
        onSuccess: async (result) => {
          cornerAlert("Payment success:" + result.order_id);
          await updateStatus({
            id: result.order_id,
            status: 2,
            payment_date: result.transaction_time,
            shippings: payment.shippings,
          });
          router.push("/web/cart?tab=craft");
        },
        onPending: async (result) => {
          cornerAlert("Payment pending:" + result.order_id);
          await updateStatus({
            id: result.order_id,
            status: 1,
            shippings: payment.shippings,
          });
          router.push("/web/reservation?tab=craft");
        },
        onError: async (result) => {
          cornerError("Payment error:" + result.order_id);
          await updateStatus({
            id: result.order_id,
            status: 6,
            shippings: payment.shippings,
          });

          cornerError("Payment failed, please try again");
          router.push("/web/reservation?tab=craft");
        },
        onClose: async () => {
          cornerAlert("Payment closed");
          await updateStatus({
            id: payment.order_id,
            status: 6,
            shippings: payment.shippings,
            isClose: 1,
          });
          router.push("/web/reservation?tab=craft");
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment?.token]);
  return { payment, isLoading };
};

export default usePayment;
