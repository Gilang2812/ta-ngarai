import { LANDMARK_POSITION } from "./objectLandmark";

type AirPlane = {
  id: number;
  origin: google.maps.LatLngLiteral;
  isActive: boolean;
};
type City = {
  coords: google.maps.LatLngLiteral;
};
export const launchAirplanes = (
  mapRef: React.MutableRefObject<google.maps.Map | null>,
  cities: City[],
  setAirplanes: React.Dispatch<React.SetStateAction<AirPlane[]>>,
  smoothTransition:(target: google.maps.LatLngLiteral, zoom: number)=>void
) => {
  smoothTransition(LANDMARK_POSITION, 5)
  setAirplanes(
    cities.map((city, index) => ({
      id: index,
      origin: city.coords,
      isActive: true,
    }))
  );
};
 