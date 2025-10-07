import { axiosServer } from "@/lib/axiosServer";
import { objectRoutesType } from "@/types/common/ObjectRouteType";
import { SimplifiedObject } from "@/types/schema/PackageSchema";
import { useQuery } from "@tanstack/react-query";

export const useGetObjectById = (id: string, object: objectRoutesType) => {
  return useQuery<
    SimplifiedObject & { galleries: Array<{ id: string; url: string }> }
  >({
    queryKey: ["object", object, id],
    queryFn: async () => {
      const { data } = await axiosServer.get(
        `/object/galleries/${object}/${id}`
      );
      return data;
    },
  });
};
