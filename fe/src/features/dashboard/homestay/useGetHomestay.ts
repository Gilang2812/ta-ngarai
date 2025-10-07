import { useAxiosAuth } from "@/lib/axios";
import { FetchHomestayProps } from "@/types/schema/HomestaySchema";
 
import { useQuery } from "@tanstack/react-query";

export const useGetHomestay = (id: string) => {
  const axiosInstance = useAxiosAuth()
 return useQuery<FetchHomestayProps>({
    queryKey: ["homestay"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/homestays/${id}`);
      return data;
    },
  });
};
