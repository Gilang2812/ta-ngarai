import { useAxiosAuth } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchMe = () => {
  const axiosInstance = useAxiosAuth();
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/users/me");
      return data;
    },
  });
};
