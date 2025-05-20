import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { FormMarketplace } from "@/type/schema/MarketplaceSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateMarketplace = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: FormMarketplace) => {
      const { data } = await axiosInstance.patch(`/souvenirs/${body.id}`,body);
      return data;
    },
    onSuccess,
    onError,
  });
};
