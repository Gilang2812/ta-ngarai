import { axiosInstance } from "@/lib/axios";
import { useUserPositionStore } from "@/stores/UserPositionStore";
import { objectRoutesType } from "@/type/common/ObjectRouteType";
import { SimplifiedObject } from "@/type/schema/PackageSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchObjectAround = (object: objectRoutesType) => {
  const { userPosition, radius } = useUserPositionStore();

  const allDefined = userPosition != null && radius != null && radius > 0;

  return useQuery<SimplifiedObject[]>({
    queryKey: [
      "objectAround",
      object,
      userPosition?.lat ?? null,
      userPosition?.lng ?? null,
      radius ?? null,
    ],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/object/${object}`, {
        params: {
          lat: userPosition?.lat,
          long: userPosition?.lng,
          radius,
        },
      });
      return data;
    },
    enabled: allDefined,
  });
};
