import { useAxiosAuth } from "@/lib/axios"; 
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { useFetchMe } from "../users/useFetchMe";
import { useSession } from "next-auth/react";

export const useDeleteDetailSouvenir = ({ onSuccess }: ActionProps) => {
  const { data: user, refetch } = useFetchMe();
  const { update } = useSession();
  const axiosInstance = useAxiosAuth();
  return useMutation({
    mutationFn: async ({
      id_souvenir_place,
      user_id,
    }: {
      id_souvenir_place: string;
      user_id: number;
    }) => {
      const { data } = await axiosInstance.delete(
        `/souvenirs/detail/${id_souvenir_place}/${user_id}/delete`
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
