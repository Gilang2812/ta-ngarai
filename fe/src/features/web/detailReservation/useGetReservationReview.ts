import { useAxiosAuth } from "@/lib/axios";
import { DetailReservationReview } from "@/types/schema/ReservationSchema";
import { useQuery } from "@tanstack/react-query";

export const useGetReservationReview = (id: string) => {
  const axiosInstance = useAxiosAuth()
 return useQuery<DetailReservationReview>({
    queryKey: ["reviewReservation", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reservations/review/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
