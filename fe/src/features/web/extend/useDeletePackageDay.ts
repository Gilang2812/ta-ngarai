import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";

export const useDeletePackageDay = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async ({
      day,
      package_id,
    }: {
      day: number;
      package_id: string;
    }) => {
      const { data } = await axiosInstance.delete(
        `/packages/day/${day}/${package_id}`
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
