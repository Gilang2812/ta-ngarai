import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { UpdateCraftCartForm } from "@/types/schema/CraftCartSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCraftCart = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async ({
      id_souvenir_place,
      craft_variant_id,
      jumlah,
      checkout_id,
    }: UpdateCraftCartForm) => {
      const { data } = await axiosInstance.patch(
        `/craft-carts/${craft_variant_id}/${id_souvenir_place}/${checkout_id}`,
        { jumlah }
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
