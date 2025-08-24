import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useCreateCart = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: { package_id: string }) => {
      console.log("Creating cart with body:", body);
      const { data } = await axiosInstance.post("/carts", body);
      return data;
    },
    onSuccess,
    onError,
  });
};
