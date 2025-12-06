import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { AddressForm } from "@/types/schema/CheckoutSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCreateAddress = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth();
  return useMutation({
    mutationFn: async (address: AddressForm) => {
      const { data } = await axiosInstance.post("/addresses", address);
      return data;
    },
    onSuccess,
    onError: onError,
  });
};
