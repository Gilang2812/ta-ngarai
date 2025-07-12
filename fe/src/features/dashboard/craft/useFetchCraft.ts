import { axiosInstance } from "@/lib/axios";
import { CraftResponse } from "@/type/schema/CraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchCraft = () => {
  return useQuery<CraftResponse[]>({
    queryKey: ["craft"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/crafts");
      return data;
    },
  });
};
