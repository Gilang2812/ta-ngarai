import { Marker } from "@react-google-maps/api";
import React, { memo } from "react";

type Props = {
  position: google.maps.LatLngLiteral | null;
};
const MarkerManualLocation = ({ position }: Props) => {
  return (
    position && (
      <Marker animation={google.maps.Animation.DROP} position={position}>
        MarkerManualLocation
      </Marker>
    )
  );
};

MarkerManualLocation.displayName = "MarkerManualLocation";
export default memo(MarkerManualLocation);
