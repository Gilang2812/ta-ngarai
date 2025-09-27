import useToggleOpen from "@/hooks/useToggleOpen";
import { InfoWindow, Marker } from "@react-google-maps/api";
import React, { memo } from "react";

type Props = {
  position: google.maps.LatLngLiteral | null;
};
const MarkerManualLocation = ({ position }: Props) => {
  const { isOpen, toggle } = useToggleOpen();
  return (
    position && (
      <Marker animation={google.maps.Animation.DROP} onClick={toggle} position={position}>
        {isOpen && position && (
          <InfoWindow onCloseClick={toggle}>
            <p>You Are Here</p>
          </InfoWindow>
        )}
      </Marker>
    )
  );
};

MarkerManualLocation.displayName = "MarkerManualLocation";
export default memo(MarkerManualLocation);
