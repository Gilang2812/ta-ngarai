import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";

export const useDeleteDetailPackage = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async ({
      activity,
      day,
      package_id,
    }: {
      activity: string;
      day: string;
      package_id: string;
    }) => {
      const { data } = await axiosInstance.delete(
        `/packages/detail/${activity}/${day}/${package_id}`
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
