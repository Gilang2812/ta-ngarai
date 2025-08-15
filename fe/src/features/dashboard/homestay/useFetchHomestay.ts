import { axiosInstance } from "@/lib/axios";
import { HomestaySchema } from "@/type/schema/HomestaySchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchHomestay = () => {
  return useQuery<HomestaySchema[]>({
    queryKey: ["homestay"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/homestays");
      return data;
    },
  });
};
