import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateAttraction = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const { data } = await axiosInstance.patch(
        `/attractions/${body.get("id")}`,
        body
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
