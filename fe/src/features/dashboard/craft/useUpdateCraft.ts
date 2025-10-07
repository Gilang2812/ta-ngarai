import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { Craft } from "@/types/schema/CraftSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCraft = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (craft: Craft) => {
      const { data } = await axiosInstance.patch(`/crafts/${craft.id}`, craft);
      return data;
    },
    onSuccess,
    onError: onError,
  });
};
 

