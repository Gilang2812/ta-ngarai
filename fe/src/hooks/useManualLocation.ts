 
import { useUserPositionStore } from "@/stores/UserPositionStore";
import { useCallback, useState } from "react";

export const useSetManualLocation = () => {
  const { userPosition: clickedPosition, setUserPosition: setClickedPosition,setRadius } =
    useUserPositionStore();
  const [isClickMapActivce, setIsClickMapActive] = useState(false); 
  const toggleManualLocation = () => {
    setIsClickMapActive((prev) => !prev);
    setRadius(null);

    if (clickedPosition) setClickedPosition(null);
  };

  const handleManualLocation = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng && isClickMapActivce) {
        setRadius(null);
        setClickedPosition({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
      }
    },
    [isClickMapActivce, setClickedPosition, setRadius]
  );
  return {
    clickedPosition,
    handleManualLocation,
    toggleManualLocation,
    isClickMapActivce,
  };
};
