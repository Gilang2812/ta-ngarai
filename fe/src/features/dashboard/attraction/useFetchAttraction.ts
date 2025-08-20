import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchAttraction = () => {
  return useQuery({
    queryKey: ["attractions"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/attractions");
      return data;
    },
  });
};
