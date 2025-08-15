import { axiosInstance } from "@/lib/axios";
import { FetchHomestayProps } from "@/type/schema/HomestaySchema";
 
import { useQuery } from "@tanstack/react-query";

export const useGetHomestay = (id: string) => {
  return useQuery<FetchHomestayProps>({
    queryKey: ["homestay"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/homestays/${id}`);
      return data;
    },
  });
};
