import { useAxiosAuth } from "@/lib/axios";
import {  HomestayUnitType } from "@/type/schema/HomestaySchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchUnitTypes = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<HomestayUnitType[]>({
    queryKey: ["homestayUnitTypes"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/homestays/types/index");
      return data;
    },
  });
};
