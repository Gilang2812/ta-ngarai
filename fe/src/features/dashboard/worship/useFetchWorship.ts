import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchWorship = () => {
  return useQuery({
    queryKey: ["worship"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/worship");
      return data;
    },
  });
};
