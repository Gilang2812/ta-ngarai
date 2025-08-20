import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler"; 

export const useCreatePackage = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const { data } = await axiosInstance.post("/packages/create", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess,
    onError,
  });
};
