import { useUserPositionStore } from "@/stores/UserPositionStore";
import { smoothTransition } from "@/utils/map/SmoothTransition";
import { useCallback, useState } from "react";

export const useUserNavigation = (
  mapRef: React.MutableRefObject<google.maps.Map | null>
) => {
  const [locationError, setLocationError] = useState<string | null>(null);
  const {
    userPosition: userLocation,
    setUserPosition: setUserLocation,
    setRadius,
  } = useUserPositionStore();

  const [tracking, setTracking] = useState(false);
  const handleLocateUser = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }
    setLocationError(null);
    setTracking((prev) => !prev);
    setRadius(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        if (!userLocation || userPos.lat !== userLocation?.lat) {
          setUserLocation(userPos);
          smoothTransition(mapRef, userPos, 18);
        } else {
          setUserLocation(null);
        }
      },
      (err) => {
        setLocationError("gagal menadapatkan locasi: " + err.message);
        setTracking(false);
      },
      {
        timeout: 5000,
        enableHighAccuracy: true,
      }
    );
  }, [mapRef, userLocation, setUserLocation, setRadius]);

  return {
    handleLocateUser,
    tracking,
    userLocation,
    locationError,
  };
};
