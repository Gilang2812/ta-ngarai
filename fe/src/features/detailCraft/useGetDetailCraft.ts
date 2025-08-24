import { useAxiosAuth } from "@/lib/axios";
import { CraftVariantInclude } from "@/type/schema/CraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailCraft = <T>({
  id_souvenir_place,
  id_craft,
  include = [],
}: {
  id_souvenir_place: string;
  id_craft: string;
  include?: CraftVariantInclude;
}) => {
  const axiosInstance = useAxiosAuth()
 return useQuery<T>({
    queryKey: ["detailCraft", id_souvenir_place, id_craft, include.toString()],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/detail-crafts/detail/${id_souvenir_place}/${id_craft}`,
        {
          params: {
            include: include.toString(),
          },
        }
      );
      return data;
    },
  });
};
