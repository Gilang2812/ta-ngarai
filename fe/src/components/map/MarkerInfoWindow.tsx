"use client";
import React, { ComponentProps } from "react";
import MapMarker from "./MapMarker";
import useToggleOpen from "@/hooks/useToggleOpen";
import { InfoWindowF } from "@react-google-maps/api";

const MarkerInfoWindow = ({
  children,
  ...props
}: ComponentProps<typeof MapMarker>) => {
  const { isOpen, toggle } = useToggleOpen();
  const handleClick = () => {
    toggle()
    console.log("test ini infow window")
  };
  return (
    <MapMarker onClick={handleClick} {...props}>
      {isOpen && (
        <InfoWindowF options={{ maxWidth: 300 }} onCloseClick={toggle}>
          {children}
          <p>test</p>
        </InfoWindowF>
      )}
    </MapMarker>
  );
};

export default MarkerInfoWindow;
