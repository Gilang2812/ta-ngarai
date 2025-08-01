import React, { useState } from "react";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";

type Props = {
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  travelMode?: google.maps.TravelMode;
  options?: google.maps.DirectionsRendererOptions;
  hideAllLayer?: () => void;
  suppressMarkers?: boolean;
};

const DirectionsPair: React.FC<Props> = ({
  origin,
  destination,
  travelMode = google.maps.TravelMode.DRIVING,
  options,
  hideAllLayer,
  suppressMarkers = true,
}) => {
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(
    null
  );

  return (
    <>
      {!response && (
        <DirectionsService
          options={{
            origin,
            destination,
            travelMode,
            avoidTolls: true,
            avoidHighways: false,
          }}
          callback={(res, status) => {
            if (status === "OK" && res) {
              hideAllLayer?.();
              setResponse(res);
            } else {
              console.error("Directions request failed:", status);
            }
          }}
        />
      )}

      {response && (
        <DirectionsRenderer
          directions={response}
          options={{
            suppressMarkers: suppressMarkers,
            polylineOptions: {
              strokeColor: "#435ebe",
              strokeWeight: 5,
            },
            ...options,
          }}
        />
      )}
    </>
  );
};

export default DirectionsPair;
