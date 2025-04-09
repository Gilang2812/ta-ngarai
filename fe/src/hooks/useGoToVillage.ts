import { LANDMARK_POSITION } from "@/lib/objectLandmark";
import { useCallback, useRef } from "react";

export const useGoToVillage = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const smoothTransition = useCallback(
    (target: google.maps.LatLngLiteral, zoom: number) => {
      if (!mapRef.current) return;

      const map = mapRef.current;
      const startZoom = map.getZoom() || 10;

      map.setZoom(Math.max(startZoom - 2, 8));

      map.panTo(target);

      let steps = 0;
      const zoomInterval = setInterval(() => {
        steps++;
        const progress = steps / 10;
        const currentZoom = startZoom + (zoom - startZoom) * progress;

        map.setZoom(currentZoom);

        if (progress >= 1) {
          clearInterval(zoomInterval);
        }
      }, 80);
    },
    []
  );

  const handleGoToVillage = useCallback(() => {
    if (mapRef.current) {
      smoothTransition(LANDMARK_POSITION, 18);
    }
  }, [smoothTransition]);
  return { mapRef, handleGoToVillage };
};
