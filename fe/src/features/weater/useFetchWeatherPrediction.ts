import { LANDMARK_POSITION } from "@/lib/objectLandmark";
import { OpenMeteoDailyResponse } from "@/type/schema/OpenMeteoSchema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchWeatherPrediction = () => {
  return useQuery<OpenMeteoDailyResponse>({
    queryKey: ["weatherPrediction"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: LANDMARK_POSITION.lat,
            longitude: LANDMARK_POSITION.lng,
            daily: "temperature_2m_min,temperature_2m_max,weathercode",
            timezone: "auto",
            forecast_days: 14,
          },
        }
      );
      return data;
    },
  });
};

export default useFetchWeatherPrediction;
