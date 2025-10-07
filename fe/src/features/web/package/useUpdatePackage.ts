import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePackage = <T extends { id: string }>({
  onSuccess,
}: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async ({ id, ...rest }: T) => {
      const { data } = await axiosInstance.patch(`/packages/update/${id}`, {
        id,
        ...rest,
      });
      return data;
    },
    onSuccess,
    onError,
  });
};
