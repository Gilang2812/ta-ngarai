import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler"; 
import { ServiceFormSchema } from "@/types/schema/ServiceSchema";

export const useCreateService = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: ServiceFormSchema) => {
      const { data } = await axiosInstance.post(
        "/services/service/create",
        body
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
