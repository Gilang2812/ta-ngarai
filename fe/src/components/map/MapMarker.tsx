import { Marker } from "@react-google-maps/api";
import React from "react";

export const MapMarker = ({
  ...props
}: React.ComponentProps<typeof Marker>) => {
  return <Marker {...props} animation={google.maps.Animation.DROP} />;
};
