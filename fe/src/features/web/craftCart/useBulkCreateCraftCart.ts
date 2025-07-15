import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { CraftCartForm } from "@/type/schema/CraftCartSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkCreateCraftCart = ({ onSuccess }: ActionProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: { items: CraftCartForm[] }) => {
      const { data } = await axiosInstance.post("/craft-carts/bulk", body);
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.refetchQueries({ queryKey: ["craftCart"] });
      onSuccess(data);
    },
    onError,
  });
};
