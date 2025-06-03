import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCreatePayment = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: unknown) => {
      const { data } = await axiosInstance.post("payment/create", body);
      return data;
    },
    onSuccess,
    onError,
  });
};
