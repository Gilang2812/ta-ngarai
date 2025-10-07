import { useAxiosAuth } from "@/lib/axios";
import { ReservationSchema } from "@/types/schema/ReservationSchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserReservations = () => {
  const axiosInstance = useAxiosAuth()
 return useQuery<ReservationSchema[]>({
    queryKey: ["reservations-user"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/reservations/user");
      return data;
    },
  });
};
