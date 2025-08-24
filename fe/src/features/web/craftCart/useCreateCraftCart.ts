import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { CraftCartForm, CraftCartSchema } from "@/type/schema/CraftCartSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCraftCart = ({ onSuccess }: ActionProps) => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: CraftCartForm) => {
      const { data } = await axiosInstance.post<CraftCartSchema>(
        "/craft-carts",
        body
      );
      return data;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["craftCart"] });
      onSuccess?.();
    },
    onError,
  });
};
