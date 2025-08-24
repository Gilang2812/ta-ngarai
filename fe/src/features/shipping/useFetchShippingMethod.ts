import { useAxiosAuth } from "@/lib/axios"; 
import { ShippingData } from "@/type/schema/ShippingSchema";
import { useQuery } from "@tanstack/react-query";

type ShippingMethodParams = {
  shipper_destination_id?: number;
  receiver_destination_id: number | string;
  weight: number;
  item_value: number;
  cod?: "no" | "yes";
};
export const useFetchShippingMethod = ({
  shipper_destination_id = 49279,
  receiver_destination_id,
  weight,
  item_value,
  cod = "no",
}: ShippingMethodParams) => {
  const axiosInstance = useAxiosAuth()
 return useQuery<ShippingData>({
    queryKey: ["shippingMethods"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/shipping/calculate", {
        params: {
          shipper_destination_id,
          receiver_destination_id,
          weight,
          item_value,
          cod,
        },
      });
      return data.data;
    },
    enabled: !!receiver_destination_id && !!weight && !!item_value,
  });
};
