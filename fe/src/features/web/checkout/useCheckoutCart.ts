import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { CraftCartForm } from "@/types/schema/CraftCartSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCheckoutCart = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: { items: CraftCartForm[] }) => {
      const { data } = await axiosInstance.post('/checkouts/cart', body);
      return data;
    },
    onSuccess,
    onError,
  });
};
