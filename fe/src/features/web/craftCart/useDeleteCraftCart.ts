import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCraftCart = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async ({
      craft_variant_id,
      id_souvenir_place,
      checkout_id,
    }: {
      craft_variant_id: string;
      id_souvenir_place: string;
      checkout_id: string;
    }) => {
      const { data } = await axiosInstance.delete(
        `/craft-carts/${craft_variant_id}/${id_souvenir_place}/${checkout_id}`
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
