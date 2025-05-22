import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { Craft } from "@/type/schema/CraftSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCraft = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (craft: Craft) => {
      const { data } = await axiosInstance.put(`/crafts/${craft.id}`, craft);
      return data;
    },
    onSuccess,
    onError: onError,
  });
};
 

