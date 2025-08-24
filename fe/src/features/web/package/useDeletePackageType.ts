import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";

export const useDeletePackageType = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/packages/types/${id}`);
      return data;
    },
    onSuccess,
    onError,
  });
};
