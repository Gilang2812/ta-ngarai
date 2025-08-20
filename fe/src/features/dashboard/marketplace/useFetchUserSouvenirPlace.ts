import { axiosInstance } from "@/lib/axios";
import { useSocketStore } from "@/stores/socketStore";
import { UserMarketplaceSchema } from "@/type/schema/SouvenirSchema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFetchUserSouvenirPlace = () => {
  const { socket, joinRoom, leaveRoom } = useSocketStore();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!socket) return;
    joinRoom("sp-user");
    const handler = () => {
      queryClient.invalidateQueries({ queryKey: ["sp-user"] });
    };
    socket.on("souvenirPlace", handler);
    return () => {
      leaveRoom("sp-user");
      socket.off("souvenirPlace", handler);
    };
  }, [socket, joinRoom, leaveRoom, queryClient]);
  return useQuery<UserMarketplaceSchema[]>({
    queryKey: ["sp-user"],
    queryFn: async () => {
      const { data } = await axiosInstance("/souvenirs/user/index");
      return data;
    },
  });
};
