import { useAxiosAuth } from "@/lib/axios";
import {  ShippingDataWithReviewGallery } from "@/types/schema/CraftTransactionSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchSouvenirTransaction = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<ShippingDataWithReviewGallery[]>({
    queryKey: ["user-transaction"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/checkouts/transactions");
      return data;
    },
  });
};
