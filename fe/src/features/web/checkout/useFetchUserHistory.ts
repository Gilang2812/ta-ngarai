import { useAxiosAuth } from "@/lib/axios";
import { useSocketStore } from "@/stores/socketStore";
import { ShippingDataWithReviewGallery } from "@/type/schema/CraftTransactionSchema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFetchUserHistory = () => {
  const { socket, joinRoom, leaveRoom } = useSocketStore();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!socket) return;
    joinRoom("user-history");
    const handler = () => {
      queryClient.invalidateQueries({ queryKey: ["user-history"] });
    };
    socket.on("user-history", handler);
    return () => {
      leaveRoom("user-history");
      socket.off("user-history", handler);
    };
  }, [socket, joinRoom, leaveRoom, queryClient]);

  const axiosInstance = useAxiosAuth();
  return useQuery<ShippingDataWithReviewGallery[]>({
    queryKey: ["user-history"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/checkouts/history");
      return data;
    },
  });
};
