import { useCallback, useEffect, useState } from "react";
import { cities } from "@/data/cities";
import { useLaunchAirplaness } from "@/lib/launchAirPlanes";
import { smoothTransition } from "@/utils/map/SmoothTransition";
import { LANDMARK_POSITION } from "@/lib/objectLandmark";

export const useAirPlaneController = (
  mapRef: React.MutableRefObject<google.maps.Map | null>
) => {
  const [showAirPlane, setShowAirPlane] = useState(false);
  const [airplanes, setAirplanes] = useState<
    Array<{
      id: number;
      origin: google.maps.LatLngLiteral;
      isActive: boolean;
    }>
  >([]);
  const { launchAirplanes } = useLaunchAirplaness(mapRef, cities, setAirplanes);

  const launchAllAirplanes = useCallback(() => {
    setShowAirPlane((prev) => !prev);
    launchAirplanes();
  }, [launchAirplanes]);

  useEffect(() => {
    if (!showAirPlane && mapRef.current) {
      smoothTransition(mapRef, LANDMARK_POSITION, 6);
    }
  }, [showAirPlane, mapRef]);

  return {
    airplanes,
    launchAllAirplanes,
    showAirPlane,
  };
};
