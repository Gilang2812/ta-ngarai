import React, { useState } from "react";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { useDirectionStore } from "@/stores/DirectionStore";

type Props = {
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  travelMode?: google.maps.TravelMode;
  options?: google.maps.DirectionsRendererOptions;
  hideAllLayer?: () => void;
  suppressMarkers?: boolean;
  waypoints: google.maps.LatLngLiteral[];
};

const DirectionsPair: React.FC<Props> = ({
  origin,
  destination,
  travelMode = google.maps.TravelMode.DRIVING,
  options,
  hideAllLayer,
  suppressMarkers = true,
  waypoints,
}) => {
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(
    null
  );
  const { setResponse: setResponseDirection } = useDirectionStore();
  const formatWaypoints: google.maps.DirectionsWaypoint[] = waypoints.map(
    (point) => ({
      location: { lat: point.lat, lng: point.lng },
      stopover: true,
    })
  );
  return (
    <>
      {!response && (
        <DirectionsService
          options={{
            origin,
            destination,
            travelMode,
            waypoints: formatWaypoints,
            avoidTolls: true,
            avoidHighways: false,
          }}
          callback={(res, status) => {
            if (status === "OK" && res) {
              hideAllLayer?.();
              setResponse(res);
              setResponseDirection(res);
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
