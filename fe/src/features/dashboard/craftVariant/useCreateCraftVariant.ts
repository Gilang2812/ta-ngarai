import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { CraftVariant } from "@/type/schema/CraftSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCreateCraftVariant = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (craftVariant: CraftVariant) => {
      const { data } = await axiosInstance.post("/variants", craftVariant, {});
      return data;
    },
    onSuccess,
    onError,
  });
};
