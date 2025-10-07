import { useAxiosAuth } from "@/lib/axios";
import {
  ShippingDataWithReviewGallery,
} from "@/types/schema/CraftTransactionSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchRatingItems = (id: string) => {
  const axiosInstance = useAxiosAuth()
 return useQuery<ShippingDataWithReviewGallery>({
    queryKey: ["ratingItems", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/shipping/${id}`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
