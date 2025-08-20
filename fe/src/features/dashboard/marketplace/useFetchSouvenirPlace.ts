import { axiosInstance } from "@/lib/axios";
import { useSocketStore } from "@/stores/socketStore"; 
import { UserMarketplaceSchema } from "@/type/schema/SouvenirSchema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFetchSouvenirPlace = <T>(craft = false) => {
  const { socket, joinRoom, leaveRoom } = useSocketStore();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!socket) return;
    
    joinRoom("sp-user");
    const handler = () => {
      queryClient.invalidateQueries({ queryKey: ["sp"] });
    };
    
    socket.on("souvenirPlace", handler);

    return () => {
      leaveRoom("sp");
      socket.off("souvenirPlace", handler);
    };
  }, [socket, joinRoom, leaveRoom, queryClient]);

  return useQuery<(UserMarketplaceSchema & T)[]>({
    queryKey: ["sp"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/souvenirs", {
        params: {
          craft: craft,
        },
      });
      return data;
    },
  });
};
