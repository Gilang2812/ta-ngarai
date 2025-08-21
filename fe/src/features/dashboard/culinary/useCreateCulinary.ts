import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCreateCulinary = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const { data } = await axiosInstance.post("/culinarys", body, {
        headers: {
          "Content-Type": "multipart/formdata",
        },
      });
      return data;
    },
    onSuccess,
    onError,
  });
};
