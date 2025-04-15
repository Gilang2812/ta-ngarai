import { launchAirplanes } from "@/lib/launchAirPlanes";
import { useEffect, useState } from "react";
import { useGoToVillage } from "./useGoToVillage";
import { cities } from "@/data/cities";

export const useAirPlaneController = () => {
  const [showAirPlane, setShowAirPlane] = useState(false);
  const {mapRef,handleGoToVillage,smoothTransition}= useGoToVillage()
  const [airplanes, setAirplanes] = useState<
    Array<{
      id: number;
      origin: google.maps.LatLngLiteral;
      isActive: boolean;
    }>
  >([]);

  const launchAllAirplanes = () => {
    setShowAirPlane((prev) => !prev);
    launchAirplanes(mapRef, cities, setAirplanes, smoothTransition);
  };

  useEffect(() => {
    if (!showAirPlane && mapRef.current) {
      handleGoToVillage();
    }
  }, [showAirPlane, mapRef, handleGoToVillage]);

  return {airplanes, launchAllAirplanes,showAirPlane,mapRef,handleGoToVillage};
};
