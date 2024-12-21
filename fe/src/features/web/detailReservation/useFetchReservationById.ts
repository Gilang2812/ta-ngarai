import { axiosInstance } from "@/lib/axios";
import { ReservationSchema } from "@/type/schema/ReservationSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchReservationByID = (id?: string) => {
  return useQuery<ReservationSchema>({
    queryKey: ["Reservation"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reservations/${id}`);
      return data;
    },
    enabled:!!id
  });
};
