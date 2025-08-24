import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateReservation = <T extends { id: string }>({
  onSuccess,
}: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: T) => {
      const { id, ...rest } = body;
      const { data } = await axiosInstance.patch(`/reservations/${id}`, rest);
      return data;
    },
    onSuccess,
    onError,
  });
};
