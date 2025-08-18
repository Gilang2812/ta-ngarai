import { axiosInstance } from "@/lib/axios";
import { DetailCraftInclude } from "@/type/schema/DetailCraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchStoreDetailCrafts = <T>(
  id_souvenir_place: string,
  option: DetailCraftInclude
) => {
  return useQuery<T[]>({
    queryKey: ["detailCrafts", id_souvenir_place, option.toString()],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/detail-crafts/${id_souvenir_place}/index`,
        {
          params: { include: option.toString() },
        }
      );
      return data;
    },
    ...option,
  });
};
