import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query"; 

export const useDeleteCraftVariant = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (craftVariantId: string) => {
      const { data } = await axiosInstance.delete(
        `/variants/${craftVariantId}`
      );
      return data;
    },
    onSuccess,
    onError: onError,
  });
};
