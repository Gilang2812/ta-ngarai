import { axiosInstance } from "@/lib/axios";
import { DetailHomestayReservation } from "@/type/schema/ReservationSchema";
import { useQuery } from "@tanstack/react-query";

export const useGetHomestayReservation = (id: string) => {
  return useQuery<DetailHomestayReservation>({
    queryKey: ["homestayreservation", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`reservations/homestay/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
