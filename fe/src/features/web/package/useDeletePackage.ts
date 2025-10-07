import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";

export const useDeletePackage = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/packages/delete/${id}`);
      return data;
    },
    onSuccess,
    onError,
  });
};
