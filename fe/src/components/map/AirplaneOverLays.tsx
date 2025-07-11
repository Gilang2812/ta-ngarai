"use client";

import { AirplaneToLandmark } from "./AirPlaneAnimation";

type Props = {
  airplanes: Array<{
    id: number;
    origin: google.maps.LatLngLiteral;
    isActive: boolean;
  }>;
  showAirPlane: boolean;
};

const AirplaneOverlays = ({ airplanes, showAirPlane }: Props) => {
  if (!showAirPlane) return null;

  return (
    <>
      {airplanes.map(
        (plane) =>
          plane.isActive && (
            <AirplaneToLandmark
              key={plane.id}
              origin={plane.origin}
              duration={5000}
              delay={1000}
              showAirPlane={showAirPlane}
            />
          )
      )}
    </>
  );
};
export default AirplaneOverlays;
