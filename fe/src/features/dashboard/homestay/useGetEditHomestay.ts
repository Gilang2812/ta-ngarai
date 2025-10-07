import { useAxiosAuth } from "@/lib/axios";
import { DataEditHomestay } from "@/types/schema/HomestaySchema";

import { useQuery } from "@tanstack/react-query";

export const useGetEditHomestay = (id: string) => {
  const axiosInstance = useAxiosAuth()
 return useQuery<DataEditHomestay>({
    queryKey: ["homestay"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/homestays/${id}/edit`);
      return data;
    },
  });
};
