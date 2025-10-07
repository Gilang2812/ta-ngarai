import { useAxiosAuth } from "@/lib/axios";
import {
  HomestayFacilitySchema,
} from "@/types/schema/FacilitySchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchFacilityUnits = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<HomestayFacilitySchema[]>({
    queryKey: ["homestayFacilitiesUnit"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/homestay-facility/units/index`);
      return data;
    },
  });
};
