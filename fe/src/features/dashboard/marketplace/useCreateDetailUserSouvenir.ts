import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/AuthStore";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCreateDetailUserSouvenir = ({ onSuccess }: ActionProps) => {
  const { fetchMe } = useAuthStore();

  return useMutation({
    mutationFn: async (body: { user: string; id_souvenir_place: string }) => {
      const { data } = await axiosInstance.post(
        "/souvenirs/detail/create",
        body
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
