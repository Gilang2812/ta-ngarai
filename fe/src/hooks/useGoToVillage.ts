import { LANDMARK_POSITION } from "@/lib/objectLandmark";
import { smoothTransition } from "@/utils/map/SmoothTransition";
import { useCallback } from "react";

export const useGoToLocation = (
  mapRef: React.MutableRefObject<google.maps.Map | null>
) => {
  const handleGoToVillage = useCallback(() => {
    if (mapRef.current) {
      smoothTransition(mapRef, LANDMARK_POSITION, 18);
    }
  }, [mapRef]);
  return { handleGoToVillage, smoothTransition };
};
