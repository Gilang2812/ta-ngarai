"use client";
import { Marker } from "@react-google-maps/api";
import { LANDMARK_POSITION } from "@/lib/objectLandmark";
import { useAirPlane } from "@/hooks/useAirPlane";



type AirplaneProps = {
  origin: google.maps.LatLngLiteral;
  duration?: number;
  delay?: number;
  onArrival?: () => void;
  showAirPlane:boolean
};

export const AirplaneToLandmark = ({ 
  origin, 
  duration = 5000,
  delay = 0,
  showAirPlane=false
}: AirplaneProps) => {

  const  {currentPosition,hasArrived,rotation}= useAirPlane(origin,LANDMARK_POSITION,duration,delay,showAirPlane)
  const AIRPLANE_ICON = {
    url: hasArrived
      ? "https://cdn-icons-png.flaticon.com/512/8213/8213476.png"
      : "/icons/plane.svg",
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 20)
  };

  return (
    <Marker
      position={currentPosition}
      icon={{
        ...AIRPLANE_ICON,
        rotation: hasArrived ? 0 : rotation
      }}
      zIndex={1000}
    />
  );
};