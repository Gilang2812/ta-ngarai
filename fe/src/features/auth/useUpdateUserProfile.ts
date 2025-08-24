import { useAxiosAuth } from "@/lib/axios";

import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { UpdateProfileForm } from "@/validation/authSchema";
import { useMutation } from "@tanstack/react-query";
import { useFetchMe } from "./useFetchMe";
import { useSession } from "next-auth/react";

export const useUpdateUserProfile = ({ onSuccess }: ActionProps) => {
  const { data: user, refetch } = useFetchMe();
  const { update } = useSession();
  const axiosInstance = useAxiosAuth();
  return useMutation({
    mutationFn: async (body: UpdateProfileForm) => {
      const { data } = await axiosInstance.patch("/user/update", body);

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
