import { axiosServer } from "@/lib/axios";
import { CourierRatesRequestBody } from "@/type/schema/ShippingSchema";
import { useQuery } from "@tanstack/react-query";

const useCourierRates = (body: CourierRatesRequestBody) => {
  return useQuery({
    queryKey: ["courierRates", body],
    queryFn: async () => {
      console.log("test");

      const { data } = await axiosServer.get("/shipping/courier/index", {
        params: body,
      });
      return data;
    },
  });
};

export default useCourierRates;
