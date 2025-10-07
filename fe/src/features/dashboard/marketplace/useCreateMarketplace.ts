import { useAxiosAuth } from "@/lib/axios";

import { ActionProps } from "@/types/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { useFetchMe } from "../users/useFetchMe";
import { useSession } from "next-auth/react";

export const useCreateMarketplace = ({ onSuccess }: ActionProps) => {
  const { data: user, refetch } = useFetchMe();
  const { update } = useSession();
  const axiosInstance = useAxiosAuth();
  return useMutation({
    mutationFn: async (body: FormData) => {
      const { data } = await axiosInstance.post("/souvenirs", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
    onError: onError,
  });
};
