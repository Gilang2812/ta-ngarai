import { useAxiosAuth } from "@/lib/axios";
import { DetailCraftInclude } from "@/types/schema/DetailCraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchStoreDetailCrafts = <T>(
  id_souvenir_place: string,
  option: DetailCraftInclude
) => {
  const axiosInstance = useAxiosAuth()
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
