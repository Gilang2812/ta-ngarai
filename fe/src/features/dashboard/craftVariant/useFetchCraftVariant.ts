import { axiosInstance } from "@/lib/axios";
import { FetchCraftVariant } from "@/type/schema/CraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchCraftVariant = () => {
  return useQuery<FetchCraftVariant[]>({
    queryKey: ["craftVariant"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/variants");
      return data;
    },
  });
};
