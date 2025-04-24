import { axiosInstance } from "@/lib/axios";
import { objectRoutesType } from "@/type/common/ObjectRouteType";
import { useQuery } from "@tanstack/react-query";

 
export const useFetchObjectAround = (
  object: objectRoutesType,
  lat?: number,
  lng?: number,
  radius?: number | null
) => {
  return useQuery({
    queryKey: [`object${object}`],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/${object}`, {
        params: {
          lat,
          lng,
          radius,
        },
      });
      return data;
    },
  });
};
