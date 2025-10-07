import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateTokenReservation = <T extends { id: string }>({
  onSuccess,
}: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: T) => {
      const { id, ...rest } = body;
      const { data } = await axiosInstance.patch(
        `/reservations/payment/${id}`,
        rest
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
