"use client";
import { Marker } from "@react-google-maps/api";
import { LANDMARK_POSITION } from "@/lib/objectLandmark";
import { useAirPlane } from "@/hooks/useAirPlane";

type AirplaneProps = {
  type?: "plane" | "bus";
  origin: google.maps.LatLngLiteral;
  duration?: number;
  delay?: number;
  onArrival?: () => void;
  showAirPlane: boolean;
};

export const AirplaneToLandmark = ({
  type = "plane",
  origin,
  duration = 5000,
  delay = 0,
  showAirPlane = false,
}: AirplaneProps) => {
  const COOR_PADANG = { lat: -0.7887883759026773, lng: 100.28325921114201 };
  const destination = type === "plane" ? COOR_PADANG : LANDMARK_POSITION;
  const { currentPosition, hasArrived, rotation } = useAirPlane(
    origin,
    destination,
    duration,
    delay,
    showAirPlane
  );

  const ICON = {
    url: type === "plane" ? "/icons/plane.svg" : "/icons/car.png",
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 20),
  };

  return (
    <Marker
      position={currentPosition}
      icon={{
        ...ICON,
        rotation: hasArrived ? 0 : rotation,
      }}
      zIndex={1000}
    />
  );
};
