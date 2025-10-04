import { useAxiosAuth } from "@/lib/axios";

import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { ChangePasswordSchema } from "@/validation/authSchema";
import { useMutation } from "@tanstack/react-query";
import { useFetchMe } from "./useFetchMe";
import { useSession } from "next-auth/react";

export const useChangeUserPassword = ({ onSuccess }: ActionProps) => {
  const { refetch } = useFetchMe();

  const { update } = useSession();

  const axiosInstance = useAxiosAuth();
  return useMutation({
    mutationFn: async (body: ChangePasswordSchema) => {
      const { data } = await axiosInstance.patch("/user/change-password", body);

      return data;
    },
    onSuccess: async (data) => {
      const refreshed = await refetch();
      await update({
        user: refreshed?.data?.user,
        accessToken: refreshed?.data?.token,
      });
      onSuccess(data);
    },
    onError,
  });
};
