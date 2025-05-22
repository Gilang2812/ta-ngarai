import { axiosInstance } from "@/lib/axios";
import { Craft } from "@/type/schema/CraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchCraft = () => {
  return useQuery<Craft[]>({
    queryKey: ["craft"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/crafts");
      return data;
    },
  });
};
