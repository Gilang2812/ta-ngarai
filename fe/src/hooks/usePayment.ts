import { useGetPaymentById } from "@/features/web/payment/useGetPaymentById";
import { cornerAlert, cornerError } from "@/utils/AlertUtils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const usePayment = (id: string) => {
  const { data: payment, isLoading } = useGetPaymentById(id);
  const router = useRouter();

  useEffect(() => {
    if (payment && payment?.token) {
      window?.snap?.pay(payment.token, {
        onSuccess: async (result) => {
          cornerAlert("Payment success:" + result.order_id);
          router.push("/web/reservation?tab=craft");
        },
        onPending: async (result) => {
          cornerAlert("Payment pending:" + result.order_id);
          router.push("/web/reservation?tab=craft");
        },
        onError: async (result) => {
          console.log("Payment error:", result);
          cornerError("Payment error:" + result.order_id);
          cornerError("Payment failed, please try again");
          router.push("/web/reservation?tab=craft");
        },
        onClose: async () => {
          cornerAlert("Payment closed");
          router.push("/web/reservation?tab=craft");
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment?.token]);
  return { payment, isLoading };
};

export default usePayment;
