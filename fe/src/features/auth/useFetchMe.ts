import { useAxiosAuth } from "@/lib/axios";
import { LoginResponse } from "@/validation/authSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchMe = () => {
  const axiosInstance = useAxiosAuth();
  return useQuery({
    queryKey: ["fetchMe"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<LoginResponse>("/auth/me");
      return data;
    },
    enabled: false,
  });
};
