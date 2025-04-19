import { useCallback } from "react";
import { LANDMARK_POSITION } from "./objectLandmark";
import { smoothTransition } from "@/utils/map/SmoothTransition";

type AirPlane = {
  id: number;
  origin: google.maps.LatLngLiteral;
  isActive: boolean;
};
type City = {
  coords: google.maps.LatLngLiteral;
};
export const useLaunchAirplaness = (
  mapRef: React.MutableRefObject<google.maps.Map | null>,
  cities: City[],
  setAirplanes: React.Dispatch<React.SetStateAction<AirPlane[]>>
) => {
  const launchAirplanes = useCallback(() => {
    smoothTransition(mapRef, LANDMARK_POSITION, 5);
    setAirplanes(
      cities.map((city, index) => ({
        id: index,
        origin: city.coords,
        isActive: true,
      }))
    );
  }, [cities, setAirplanes, mapRef]);

  return { launchAirplanes };
};
