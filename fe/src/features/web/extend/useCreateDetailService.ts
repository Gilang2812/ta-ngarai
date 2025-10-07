import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";
import { DetailServiceFormSchema } from "@/types/schema/ServiceSchema";

export const useCreateDetailService = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: DetailServiceFormSchema) => {
      const { data } = await axiosInstance.post("/services", body);
      return data;
    },
    onSuccess,
    onError,
  });
};
