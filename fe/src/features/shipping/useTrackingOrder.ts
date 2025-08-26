import { axiosServer } from "@/lib/axios";
import { TrackingResponse } from "@/type/schema/ShippingSchema";
import { useQuery } from "@tanstack/react-query";

const useTrackingOrder = (tracking_id: string | null) => {
  return useQuery<TrackingResponse>({
    queryKey: ["trackingOrder", tracking_id],
    queryFn: async () => {
      const { data } = await axiosServer.get(
        `/shipping/tracking/${tracking_id}`
      );
      return data;
    },
    enabled: !!tracking_id,
  });
};

export default useTrackingOrder;
