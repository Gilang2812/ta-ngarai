import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { ServiceFormSchema } from "@/type/schema/ServiceSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateService = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async ({ id, ...rest }: ServiceFormSchema) => {
      const { data } = await axiosInstance.patch(`/services/service/${id}`, {
        id,
        ...rest,
      });
      return data;
    },
    onSuccess,
    onError,
  });
};
