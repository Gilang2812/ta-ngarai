import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { UpdateProfileForm } from "@/validation/authSchema";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUserProfile = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: UpdateProfileForm) => {
      const { data } = await axiosInstance.patch("/user/update", body);

      return data;
    },
    onSuccess,
    onError,
  });
};
