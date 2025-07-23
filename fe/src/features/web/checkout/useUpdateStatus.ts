import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateStatus = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async ({
      id,
      ...rest
    }: {
      id: string;
      status: number;
      payment_date?: string;
      shippings: (string | number)[];
      isClose?: 0 | 1;
    }) => {
      const { data } = await axiosInstance.patch(`/checkouts/status/${id}`, {
        ...rest,
      });
      return data;
    },
    onSuccess,
    onError,
  });
};
