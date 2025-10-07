import { useAxiosAuth } from "@/lib/axios";
import { useSocketStore } from "@/stores/socketStore";
import { DetailReservationPackage } from "@/types/schema/ReservationSchema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFetchReservationByID = (id: string) => {
  const { socket, joinRoom, leaveRoom } = useSocketStore();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!socket || !id) return;
    joinRoom(`detailReservation:${id}`);
    const handler = () => {
      queryClient.invalidateQueries({ queryKey: ["detailReservation", id] });
    };
    socket.on("detailReservation", handler);
    return () => {
      leaveRoom(`detailReservation:${id}`);
      socket.off("detailReservation", handler);
    };
  }, [socket, joinRoom, leaveRoom, queryClient, id]);

  const axiosInstance = useAxiosAuth();
  return useQuery<DetailReservationPackage>({
    queryKey: ["detailReservation", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reservations/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
