import { useAxiosAuth } from "@/lib/axios";
import { useAuthStore } from "@/stores/AuthStore";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateDetailSouvenir = ({ onSuccess }: ActionProps) => {
  const { fetchMe } = useAuthStore();
  const axiosInstance = useAxiosAuth()
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
    onSuccess: (data) => {
      onSuccess(data);
      fetchMe();
    },
    onError,
  });
};
