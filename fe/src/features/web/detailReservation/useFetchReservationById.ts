import { DetailReservationSchemaWithPackageDay } from './../../../type/schema/ReservationSchema';
import { axiosInstance } from "@/lib/axios"; 
import { useQuery } from "@tanstack/react-query";

export const useFetchReservationByID = (id?: string) => {
  return useQuery<DetailReservationSchemaWithPackageDay>({
    queryKey: ["Reservation"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reservations/${id}`);
      return data;
    },
    enabled:!!id
  });
};
