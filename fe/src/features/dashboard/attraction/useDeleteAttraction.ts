import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAttraction = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/attractions/${id}`);
    },
    onSuccess,
    onError,
  });
};
