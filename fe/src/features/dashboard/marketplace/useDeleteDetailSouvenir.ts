import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/AuthStore";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDetailSouvenir = ({ onSuccess }: ActionProps) => {
  const { fetchMe } = useAuthStore();
  return useMutation({
    mutationFn: async ({
      id_souvenir_place,
      user_id,
    }: {
      id_souvenir_place: string;
      user_id: string;
    }) => {
      const { data } = await axiosInstance.delete(
        `/souvenirs/detail/${id_souvenir_place}/${user_id}/delete`
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
