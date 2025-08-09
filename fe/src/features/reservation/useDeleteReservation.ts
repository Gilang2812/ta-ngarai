import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useDeleteReservation = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/reservations/${id}`);
      return data;
    },
    onSuccess,
    onError,
  });
};
