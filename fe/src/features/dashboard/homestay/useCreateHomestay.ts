import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { onError } from "@/utils/ErrorHandler"; 
import { useMutation } from "@tanstack/react-query";
export const useCreateHomestay = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: FormData) => {
      const { data } = await axiosInstance.post("/homestays", body);
      return data;
    },
    onSuccess,
    onError,
  });
};
