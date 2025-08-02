import { LANDMARK_POSITION } from "@/lib/objectLandmark";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetWeatherMap = () => {
  return useQuery({
    queryKey: ["weatherMap"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?",
        {
          params: {
            lat: LANDMARK_POSITION.lat,
            lon: LANDMARK_POSITION.lng,
            appid: process.env.NEXT_PUBLIC_OPENWEATHERMAP_APPID,
            units: "metric",
          },
        }
      );
      return data;
    },
    refetchInterval: 60000, // Refetch every minute
  });
};
