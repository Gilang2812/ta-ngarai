import { axiosInstance } from "@/lib/axios";
import { ShippingData } from "@/type/schema/CraftTransactionSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserHistory = () => {
  return useQuery<ShippingData[]>({
    queryKey: ["user-history"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/checkouts/history");
      return data;
    },
  });
};
