import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { LoginResponse, LoginSchema } from "@/validation/authSchema";
import { useMutation } from "@tanstack/react-query";

export const useLogin = ({ onError, onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: LoginSchema) => {
      const { data } = await axiosInstance.post("/login", body);
      return data;
    },
    onSuccess: (data) => {
      const response = data as LoginResponse;
      localStorage.setItem("token", response.token);
      onSuccess(data);
    },
    onError,
  });
};
