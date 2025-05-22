import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { Craft } from "@/type/schema/CraftSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCreateCraft = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (craft: Craft) => {
      const { data } = await axiosInstance.post("/crafts", craft);
      return data;
    },
    onSuccess,
    onError: onError,
  });
};
