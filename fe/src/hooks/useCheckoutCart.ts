import { useCreateCheckout } from "@/features/web/checkout/useCreateCheckout";
import { cornerAlert, showLoadingAlert } from "@/utils/AlertUtils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useCheckoutCart() {
  const router = useRouter();
  const { mutateAsync: createCheckout, isPending } = useCreateCheckout({
    onSuccess: () => {
      cornerAlert("akan segera dialihkan ke halaman pembayaran!");
      setTimeout(() => {
        router.push("/web/checkout");
      }, 1000);
    },
  });

  useEffect(() => {
    if (isPending) {
      showLoadingAlert();
    }
  }, [isPending]);
  return {
    createCheckout,
  };
}
