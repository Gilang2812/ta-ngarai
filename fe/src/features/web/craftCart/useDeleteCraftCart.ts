import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCraftCart = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (idVariant: string) => {
      const { data } = await axiosInstance.delete(`/craft-carts/${idVariant}`);
      return data;
    },
    onSuccess,
    onError,
  });
};
