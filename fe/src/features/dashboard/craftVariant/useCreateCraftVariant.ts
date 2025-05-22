import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCreateCraftVariant = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (craftVariant: FormData) => {
      const { data } = await axiosInstance.post("/variants", craftVariant, {
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
