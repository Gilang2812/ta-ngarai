import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

const useCreateAttraction = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const { data } = await axiosInstance.post("/attractions", body);
      return data;
    },
    onSuccess,
    onError,
  });
};

export default useCreateAttraction;
