import { axiosInstance } from "@/lib/axios";
import { CraftDetailSchema } from "@/type/schema/CraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useGetCraft = (id: string) => {
  return useQuery<CraftDetailSchema>({
    queryKey: ["craft", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/crafts/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
