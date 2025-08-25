import { useFetchMe } from "@/features/auth/useFetchMe";
import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useUpdateDetailSouvenir = ({ onSuccess }: ActionProps) => {
  const { refetch } = useFetchMe();
  const { update } = useSession();
  const axiosInstance = useAxiosAuth();
  return useMutation({
    mutationFn: async ({
      status,
      id_souvenir_place,
      user_id,
    }: {
      user_id: string;
      id_souvenir_place: string;
      status: number;
    }) => {
      const { data } = await axiosInstance.patch(
        `/souvenirs/detail/${id_souvenir_place}/${user_id}/edit`,
        { status }
      );
      return data;
    },
    onSuccess: async (data) => {
      await refetch().then((res) => {
        update({ user: res.data?.user, accessToken: res.data?.token });
      });
      onSuccess(data);
    },
    onError,
  });
};
