import { useAxiosAuth } from "@/lib/axios";
import { ShippingDataWithReviewGallery } from "@/type/schema/CraftTransactionSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserHistory = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<ShippingDataWithReviewGallery[]>({
    queryKey: ["user-history"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/checkouts/history");
      return data;
    },
  });
};
