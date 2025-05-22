import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateCraftVariant = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (craftVariant: FormData) => {
      const { data } = await axiosInstance.patch(
        `/variants/${craftVariant.get("id")}`,
        craftVariant,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onSuccess,
    onError: onError,
  });
};
