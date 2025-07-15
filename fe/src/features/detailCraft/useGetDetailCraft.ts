import { axiosInstance } from "@/lib/axios";
import { CraftVariantInclude } from "@/type/schema/CraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailCraft = <T>({
  craft_variant_id,
  include = [],
}: {
  craft_variant_id: string;
  include?: CraftVariantInclude;
}) => {
  return useQuery<T>({
    queryKey: ["detailCraft", craft_variant_id, include.toString()],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/detail-crafts/detail/${craft_variant_id}`,
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
