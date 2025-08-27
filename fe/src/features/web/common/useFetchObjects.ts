import { useAxiosAuth } from "@/lib/axios";
import { objectRoutesType } from "@/type/common/ObjectRouteType";
import { SimplifiedObject } from "@/type/schema/PackageSchema";
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
