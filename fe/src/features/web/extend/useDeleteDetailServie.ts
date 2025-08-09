import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";

export const useDeleteDetailService = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async ({
      package_id,
      service_package_id,
    }: {
      package_id: string;
      service_package_id: string;
    }) => {
      const { data } = await axiosInstance.delete(
        `/packages/detail/${package_id}/${service_package_id}`
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
