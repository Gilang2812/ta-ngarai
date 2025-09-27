import { Marker } from "@react-google-maps/api";
import React from "react";

const MapMarker = ({
  children,
  ...props
}: React.ComponentProps<typeof Marker>) => {
  return (
    <Marker {...props}  animation={google.maps.Animation.DROP}>
      {children}
    </Marker>
  );
};
export default MapMarker;
