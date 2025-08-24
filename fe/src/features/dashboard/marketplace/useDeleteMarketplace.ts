import { useFetchMe } from "@/features/auth/useFetchMe";
import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useDeleteMarketplace = ({ onSuccess }: ActionProps) => {
  const { data: user, refetch } = useFetchMe();
  const { update } = useSession();
  const axiosInstance = useAxiosAuth();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/souvenirs/${id}`);
      return data;
    },
    onSuccess: async (data) => {
      await refetch();
      await update({
        user: user?.user,
        accessToken: user?.token,
      });
      onSuccess(data);
    },
    onError,
  });
};
