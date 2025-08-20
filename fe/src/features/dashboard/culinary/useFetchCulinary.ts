import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchCulinary = () => {
  return useQuery({
    queryKey: ["culinary"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/culinary");
      return data;
    },
  });
};
