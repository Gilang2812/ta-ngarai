import { axiosInstance } from "@/lib/axios";
import { DataEditHomestay } from "@/type/schema/HomestaySchema";

import { useQuery } from "@tanstack/react-query";

export const useGetEditHomestay = (id: string) => {
  return useQuery<DataEditHomestay>({
    queryKey: ["homestay"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/homestays/${id}/edit`);
      return data;
    },
  });
};
