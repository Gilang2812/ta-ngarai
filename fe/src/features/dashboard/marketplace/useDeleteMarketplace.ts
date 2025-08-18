import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/AuthStore";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useDeleteMarketplace = ({ onSuccess }: ActionProps) => {
  const { fetchMe } = useAuthStore();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/souvenirs/${id}`);
      return data;
    },
    onSuccess: (data) => {
      onSuccess(data);
      fetchMe();
    },
    onError,
  });
};
