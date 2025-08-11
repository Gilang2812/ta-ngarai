import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";
import { DetailServiceFormSchema } from "@/type/schema/ServiceSchema";

export const useCreateDetailService = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: DetailServiceFormSchema) => {
      const { data } = await axiosInstance.post("/services", body);
      return data;
    },
    onSuccess,
    onError,
  });
};
