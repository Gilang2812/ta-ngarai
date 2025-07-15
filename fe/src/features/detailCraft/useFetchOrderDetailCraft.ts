import { axiosInstance } from "@/lib/axios";
import { DetailCraftOrderResponse } from "@/type/schema/DetailCraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchOrderDetailCraft = (id: string[]) => {
  return useQuery<DetailCraftOrderResponse[]>({
    queryKey: ["orderDetailCraft", id.join(",")],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/detail-crafts/order/${id.join("/")}`
      );
      return data;
    },
    enabled: id.length === 2,
  });
};
