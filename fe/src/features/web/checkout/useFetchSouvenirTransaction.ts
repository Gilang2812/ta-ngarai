import { axiosInstance } from "@/lib/axios";
import {  ShippingDataWithReviewGallery } from "@/type/schema/CraftTransactionSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchSouvenirTransaction = () => {
  return useQuery<ShippingDataWithReviewGallery[]>({
    queryKey: ["user-transaction"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/checkouts/transactions");
      return data;
    },
  });
};
