 
import { axiosServer } from "@/lib/axiosServer";
import {
  CourierPricing,
  CourierRatesRequestBody,
} from "@/types/schema/ShippingSchema";
import { useQuery } from "@tanstack/react-query";

const useCourierRates = ({
  couriers,
  destination_area_id,
  origin_area_id,
  items,
}: CourierRatesRequestBody) => {
  return useQuery<CourierPricing[]>({
    queryKey: [
      "courierRates",
      couriers,
      destination_area_id,
      origin_area_id,
      items.toString(),
    ],
    queryFn: async () => {
      const { data } = await axiosServer.get("/shipping/courier/index", {
        params: {
          couriers,
          destination_area_id,
          origin_area_id,
          items,
        },
      });
      return data;
    },
  });
};

export default useCourierRates;
