import { useQuery } from "@tanstack/react-query"; 
import { axiosInstance } from "@/lib/axios";
import { AllUnitHomestayResponseSchema } from "@/type/schema/HomestaySchema";

export const useFetchAllUnitHomestay = (homestay_id: string) => {
  return useQuery<AllUnitHomestayResponseSchema[]>({
    queryKey: ["all_unit_homestay_reservation", homestay_id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/homestays/units/${homestay_id}`
      );
      return data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
  });
};
