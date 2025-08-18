import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDetailCraft = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async ({
      craft_variant_id,
      id_souvenir_place_id,
    }: {
      craft_variant_id: string;
      id_souvenir_place_id: string;
    }) => {
      const { data } = await axiosInstance.delete(
        `/detail-crafts/${id_souvenir_place_id}/${craft_variant_id}`
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
