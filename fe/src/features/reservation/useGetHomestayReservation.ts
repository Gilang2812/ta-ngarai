import { useAxiosAuth } from "@/lib/axios";
import { useSocketStore } from "@/stores/socketStore";
import { DetailHomestayReservation } from "@/type/schema/ReservationSchema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetHomestayReservation = (id: string) => {
  const { socket, joinRoom, leaveRoom } = useSocketStore();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!socket || !id) return;
    joinRoom(`detailReservation:${id}`);
    const handler = () => {
      queryClient.invalidateQueries({ queryKey: ["reservation", id] });
    };
    socket.on("detailReservation", handler);
    return () => {
      leaveRoom(`detailReservation:${id}`);
      socket.off("detailReservation", handler);
    };
  }, [socket, joinRoom, leaveRoom, queryClient, id]);

  const axiosInstance = useAxiosAuth()
 return useQuery<DetailHomestayReservation>({
    queryKey: ["homestay-reservation", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reservations/homestay/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
