import { axiosInstance } from "@/lib/axios";
import { ReservationSchema } from "@/type/schema/reservationSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchReservationByID = (id?: string) => {
  return useQuery<ReservationSchema>({
    queryKey: ["asdasd"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reservations/${id}`);
      return data;
    },
    enabled:!!id
  });
};
