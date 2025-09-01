import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useRecheckReservation = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth();
  return useMutation({
    mutationFn: async (body: { id: string }) => {
      const { id, ...rest } = body;
      const { data } = await axiosInstance.patch(
        `/reservations/recheck/${id}`,
        rest
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
