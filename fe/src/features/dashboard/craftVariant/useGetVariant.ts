import { useAxiosAuth } from "@/lib/axios";
import {
  CraftVariantInclude,
} from "@/types/schema/CraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useGetVariant = <T>(id: string, option: CraftVariantInclude) => {
  const axiosInstance = useAxiosAuth()
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
