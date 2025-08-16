import { axiosInstance } from "@/lib/axios";
import {  HomestayUnitType } from "@/type/schema/HomestaySchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchUnitTypes = () => {
  return useQuery<HomestayUnitType[]>({
    queryKey: ["homestayUnitTypes"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/homestays/types/index");
      return data;
    },
  });
};
