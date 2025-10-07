import { useAxiosAuth } from "@/lib/axios";
import { objectRoutesType } from "@/types/common/ObjectRouteType";
import { SimplifiedObject } from "@/types/schema/PackageSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchObjects = (
  object: objectRoutesType,
  geomless?: boolean
) => {
  const axiosInstance = useAxiosAuth();
  return useQuery<SimplifiedObject[]>({
    queryKey: ["objects", object],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/object/${object}`, {
        params: {
          geomless,
        },
      });
      return data;
    },
    enabled: !!object,
  });
};
