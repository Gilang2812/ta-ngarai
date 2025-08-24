import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCraft = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (craftId: string) => {
      const { data } = await axiosInstance.delete(`/crafts/${craftId}`);
      return data;
    },
    onSuccess,
    onError,
  });
};
