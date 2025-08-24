import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { CraftVariant } from "@/type/schema/CraftSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCraftVariant = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (craftVariant: CraftVariant) => {
      const { data } = await axiosInstance.patch(
        `/variants/${craftVariant.id}`,
        craftVariant
      );
      return data;
    },
    onSuccess,
    onError: onError,
  });
};
