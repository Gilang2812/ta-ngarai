import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { CraftCartSchema } from "@/type/schema/CraftCartSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCraftCart = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: CraftCartForm) => {
      const { data } = await axiosInstance.patch(
        `/craft-carts/${body.craft_variant_id}`,
        body
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
