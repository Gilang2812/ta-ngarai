import { axiosInstance } from "@/lib/axios";
import { DetailCraftInclude } from "@/type/schema/DetailCraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserDetailCrafts = <T>(option: DetailCraftInclude) => {
  return useQuery<T[]>({
    queryKey: ["detailCrafts", option.toString()],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/detail-crafts/users", {
        params: { include: option.toString() },
      });
      return data;
    },
    ...option,
  });
};
