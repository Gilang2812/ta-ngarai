import { axiosServer } from "@/lib/axiosServer";
import { AreaResponse } from "@/types/schema/ShippingSchema";
import { useQuery } from "@tanstack/react-query";

const useGetArea = (input: string | number) => {
  return useQuery<AreaResponse>({
    queryKey: ["areas", input],
    queryFn: async () => {
      const { data } = await axiosServer.get("/shipping/maps/areas", {
        params: {
          input,
        },
      });
      return data;
    },
    enabled: !!input,
  });
};

export default useGetArea;
