import { axiosInstance } from "@/lib/axios";
import { CraftVariantInclude } from "@/type/schema/CraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailCraft = <T>({
  id,
  include = [],
}: {
  id: string[];
  include?: CraftVariantInclude;
}) => {
  return useQuery<T>({
    queryKey: ["detailCraft", id.toString(), include.toString()],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/detail-crafts/detail/${id.join("/")}`,
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
