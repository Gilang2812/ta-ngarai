import { axiosInstance } from "@/lib/axios";
import { ReservationSchema } from "@/type/schema/ReservationSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchReservations = () => {
  return useQuery <ReservationSchema[]>({
    queryKey: ["reservations"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/reservations");
      return data;
    },
  });
};
