import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { Address } from "@/type/schema/CheckoutSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateAddress = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (address: Address) => {
      const { data } = await axiosInstance.patch(`/addresses/${address.address_id}`, address);
      return data;
    },
    onSuccess,
    onError: onError,
  });
}