import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { CheckoutPayload } from "@/type/schema/CheckoutSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCompleteCheckout = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: CheckoutPayload) => {
      const { data } = await axiosInstance.patch(
        `/checkouts/${body.checkout_id}`,
        body
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
