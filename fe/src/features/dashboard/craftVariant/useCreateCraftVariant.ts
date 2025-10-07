import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { CraftVariant } from "@/types/schema/CraftSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCreateCraftVariant = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (craftVariant: CraftVariant) => {
      const { data } = await axiosInstance.post("/variants", craftVariant, {});
      return data;
    },
    onSuccess,
    onError,
  });
};
