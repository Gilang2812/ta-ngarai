import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { CraftCartForm } from "@/type/schema/CraftCartSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCheckoutCart = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: { items: CraftCartForm[] }) => {
      const { data } = await axiosInstance.post('/checkouts/cart', body);
      return data;
    },
    onSuccess,
    onError,
  });
};
