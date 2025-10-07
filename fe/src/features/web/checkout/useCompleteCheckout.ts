import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { CheckoutPayload } from "@/types/schema/CheckoutSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCompleteCheckout = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: CheckoutPayload) => {
      const { data } = await axiosInstance.patch(
        `/checkouts/${body.checkout_id}`,
        body
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orderDetailCraft"] }); 
      if (onSuccess) onSuccess(data);
    },
    onError,
  });
};
