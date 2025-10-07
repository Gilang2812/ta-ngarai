import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { Address } from "@/types/schema/CheckoutSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateAddress = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (address: Address) => {
      const { data } = await axiosInstance.patch(`/addresses/${address.address_id}`, address);
      return data;
    },
    onSuccess,
    onError: onError,
  });
}