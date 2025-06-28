import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps"; 
import { FormMarketplace } from "@/type/schema/MarketplaceSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCreateMarketplace = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: FormMarketplace) => {
      const { data } = await axiosInstance.post("/souvenirs",body);
      return data;
    },
    onSuccess,
    onError: onError,
  });
};
