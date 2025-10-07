import { useQuery } from "@tanstack/react-query"; 
import { useAxiosAuth } from "@/lib/axios";
import { AllUnitHomestayResponseSchema } from "@/types/schema/HomestaySchema";

export const useFetchAllUnitHomestay = (homestay_id: string) => {
  const axiosInstance = useAxiosAuth()
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
