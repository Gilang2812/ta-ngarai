import React, { useEffect, useState } from "react";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import useTravelRoute from "@/hooks/useTravelRoute";
import { useDirectionStore } from "@/stores/DirectionStore";

type Props = {
  hideAllLayers: () => void;
};

const CustomRoute = ({ hideAllLayers }: Props) => {
  const { routes } = useTravelRoute();
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(
    null
  );
  const { setResponse: setResponseDirection } = useDirectionStore();

  useEffect(() => {
    if (routes.length >= 2) {
      setResponse(null);  
    } 
  }, [routes]);

  if (routes.length < 2) return null;

  const origin = routes[0];
  const destination = routes[routes.length - 1];
  const waypoints = routes.slice(1, routes.length - 1).map((point) => ({
    location: { lat: point.lat, lng: point.lng },
    stopover: true,
  }));

  return (
    <>
      {!response && (
        <DirectionsService
          options={{
            origin: { lat: origin.lat, lng: origin.lng },
            destination: { lat: destination.lat, lng: destination.lng },
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.DRIVING,
            avoidTolls: true,
            avoidHighways: false,
          }}
          callback={(res, status) => {
            if (status === "OK" && res) {
              hideAllLayers();
              setResponse(res);
              setResponseDirection(res);
            }  
          }}
        />
      )}

      {response && (
        <DirectionsRenderer
          directions={response}
          options={{
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: "#435ebe",
              strokeWeight: 5,
            },
          }}
        />
      )}
    </>
  );
};

export default CustomRoute;
