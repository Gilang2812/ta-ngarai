import { axiosInstance } from "@/lib/axios";
import {
  CraftVariantInclude,
} from "@/type/schema/CraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useGetVariant = <T>(id: string, option: CraftVariantInclude) => {
  return useQuery<T>({
    queryKey: ["variant", id, option],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/variants/${id}`, {
        params: { include: option.toString() },
      });
      return data;
    },
  });
};
