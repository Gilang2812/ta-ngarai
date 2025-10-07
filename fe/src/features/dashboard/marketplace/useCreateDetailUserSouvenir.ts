import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { useFetchMe } from "../users/useFetchMe";
import { useSession } from "next-auth/react";

export const useCreateDetailUserSouvenir = ({ onSuccess }: ActionProps) => {
  const { data: user, refetch } = useFetchMe();
  const { update } = useSession();

  const axiosInstance = useAxiosAuth();
  return useMutation({
    mutationFn: async (body: { user: string; id_souvenir_place: string }) => {
      const { data } = await axiosInstance.post(
        "/souvenirs/detail/create",
        body
      );
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
