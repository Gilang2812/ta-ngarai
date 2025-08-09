import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";

export const useCreatePackage = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post("/packages/create");
      return data;
    },
    onSuccess,
    onError,
  });
};
