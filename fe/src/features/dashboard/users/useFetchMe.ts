import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/users/me");
      return data;
    },
  });
};
