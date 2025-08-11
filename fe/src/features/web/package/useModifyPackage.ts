import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";

export const useModifyPackage = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post("/packages/modify");
      return data;
    },
    onSuccess,
    onError,
  });
};
