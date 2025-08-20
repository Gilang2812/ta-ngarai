import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAttraction = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/attractions/${id}`);
    },
    onSuccess,
    onError,
  });
};
