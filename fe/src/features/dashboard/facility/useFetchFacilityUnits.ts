import { axiosInstance } from "@/lib/axios";
import {
  HomestayFacilityDetailSchema,
  HomestayFacilitySchema,
} from "@/type/schema/FacilitySchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchFacilityUnits = () => {
  return useQuery<HomestayFacilitySchema[]>({
    queryKey: ["homestayFacilitiesUnit"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/homestay-facility/units/index`);
      return data;
    },
  });
};
