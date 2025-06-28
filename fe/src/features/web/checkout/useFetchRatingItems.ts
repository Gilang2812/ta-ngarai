import { axiosInstance } from "@/lib/axios";
import { ShippingData } from "@/type/schema/CraftTransactionSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchRatingItems = (id: string) => {
  return useQuery<ShippingData>({
    queryKey: ["ratingItems", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/shipping/${id}`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
