import { axiosInstance } from "@/lib/axios";
import { DetailReservationReview } from "@/type/schema/ReservationSchema";
import { useQuery } from "@tanstack/react-query";

export const useGetReservationReview = (id: string) => {
  return useQuery<DetailReservationReview>({
    queryKey: ["reviewReservation", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reservations/review/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
