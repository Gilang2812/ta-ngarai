import { axiosInstance } from "@/lib/axios";
import { DetailReservationPackage } from "@/type/schema/ReservationSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchReservationByID = (id?: string) => {
  return useQuery<DetailReservationPackage>({
    queryKey: ["Reservation"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reservations/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
