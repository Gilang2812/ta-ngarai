import { useAxiosAuth } from "@/lib/axios";
import { DetailCraftOrderResponse } from "@/types/schema/DetailCraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchOrderDetailCraft = ({
  id_craft,
  id_souvenir_place,
}: {
  id_craft: string;
  id_souvenir_place: string;
}) => {
  const axiosInstance = useAxiosAuth();
  return useQuery<DetailCraftOrderResponse[]>({
    queryKey: ["orderDetailCraft", id_craft, id_souvenir_place],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/detail-crafts/order/${id_souvenir_place}/${id_craft}`
      );
      return data;
    },
    enabled: !!id_craft && !!id_souvenir_place,
  });
};
