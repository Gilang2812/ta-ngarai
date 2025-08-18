import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/AuthStore";
import { ActionProps } from "@/type/props/ActionProps";
import { FormMarketplace } from "@/type/schema/MarketplaceSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCreateMarketplace = ({ onSuccess }: ActionProps) => {
  const { fetchMe } = useAuthStore();
  return useMutation({
    mutationFn: async (body: FormMarketplace) => {
      const { data } = await axiosInstance.post("/souvenirs", body);
      return data;
    },
    onSuccess: (data) => {
      onSuccess(data);
      fetchMe();
    },
    onError: onError,
  });
};
