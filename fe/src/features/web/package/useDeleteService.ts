import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";

export const useDeleteService = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/services/service/${id}/delete`);
      return data;
    },
    onSuccess,
    onError,
  });
};
