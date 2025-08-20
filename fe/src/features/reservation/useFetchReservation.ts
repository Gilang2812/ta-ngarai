import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { ReservationSchema } from "@/type/schema/ReservationSchema";

export const useFetchReservations = () => {
  return useQuery<ReservationSchema[]>({
    queryKey: ["all_package_reservation"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reservations`);
      return data;
    },
  });
};
