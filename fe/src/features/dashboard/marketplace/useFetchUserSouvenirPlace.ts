import { useAxiosAuth } from "@/lib/axios";
import { useSocketStore } from "@/stores/socketStore";
import { UserMarketplaceSchema } from "@/types/schema/SouvenirSchema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useFetchUserSouvenirPlace = () => {
  const { socket, joinRoom, leaveRoom } = useSocketStore();
  const queryClient = useQueryClient();
  
  useEffect(() => {
    if (!socket) return;
    
    joinRoom("sp-user");
    
    interface SouvenirPlaceEventData {
      shouldRefresh?: boolean;
      [key: string]: unknown;
    }

    const handler = (eventData: SouvenirPlaceEventData) => {
      // Hanya invalidate jika benar-benar perlu
      const currentData = queryClient.getQueryData(["sp-user"]);
      
      // Cek apakah data benar-benar berubah
      if (eventData?.shouldRefresh || !currentData) {
        queryClient.invalidateQueries({ 
          queryKey: ["sp-user"],
          exact: true // Lebih spesifik
        });
      }
    };
    
    socket.on("souvenirPlace", handler);
    
    return () => {
      leaveRoom("sp-user");
      socket.off("souvenirPlace", handler);
    };
  }, [socket, joinRoom, leaveRoom, queryClient]);

  const axiosInstance = useAxiosAuth();
  
  return useQuery<UserMarketplaceSchema[]>({
    queryKey: ["sp-user"],
    queryFn: async () => {
      const { data } = await axiosInstance("/souvenirs/user/index");
      return data;
    },
    staleTime: 30 * 1000,  
  });
};