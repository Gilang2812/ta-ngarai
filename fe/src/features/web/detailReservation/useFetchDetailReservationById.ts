import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDetailReservationByID = (id?: string) => {
  return useQuery({
    queryKey: ["detailReservation"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/detailReservations/${id}`);
      return data;
    },
    enabled:!!id
  });
};
  