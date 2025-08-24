import { useAxiosAuth } from "@/lib/axios";
import { FetchCraftVariant } from "@/type/schema/CraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchCraftVariant = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<FetchCraftVariant[]>({
    queryKey: ["craftVariant"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/variants");
      return data;
    },
  });
};
