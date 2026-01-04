import { useAxiosAuth } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchStreet = (isStreetChecked = true) => {
  const axiosInstance = useAxiosAuth();
  return useQuery<GeoJSON.FeatureCollection>({
    queryKey: ["street"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/geo/street");
      return data;
    },
    enabled: isStreetChecked,
  });
};
