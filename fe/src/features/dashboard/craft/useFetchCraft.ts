import { useAxiosAuth } from "@/lib/axios";
import { CraftResponse } from "@/types/schema/CraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchCraft = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<CraftResponse[]>({
    queryKey: ["craft"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/crafts");
      return data;
    },
  });
};
