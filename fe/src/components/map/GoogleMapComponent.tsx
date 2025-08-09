"use client";

import { GoogleMapProps } from "@/utils/map/types";
import {
  loadGoogleMapsScript,
  removeGoogleMapsScript,
  showError,
} from "@/utils/map/utils";
import React, { useEffect, useRef, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const GoogleMap: React.FC<GoogleMapProps> = ({
  center,
  zoom = 10,
  mapId,
  onMapLoad,
  onMapError,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        const mapIdToUse =
          mapId || process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || "map-component";

        if (!apiKey) {
          throw new Error("Google Maps API key is missing");
        }

        if (!mapIdToUse) {
          throw new Error("Google Maps ID is missing");
        }

        window.initMap = async () => {
          try {
            if (!mapRef.current) {
              throw new Error("Map container not found");
            }

            const { Map } = (await google.maps.importLibrary(
              "maps"
            )) as google.maps.MapsLibrary;
            const { AdvancedMarkerElement } = (await google.maps.importLibrary(
              "marker"
            )) as google.maps.MarkerLibrary;

            const map = new Map(mapRef.current, {
              center,
              zoom,
              mapId: mapIdToUse,
              disableDefaultUI: false,
              mapTypeId: "roadmap",
            });

            new AdvancedMarkerElement({
              map,
              position: center,
              title: "Location Marker",
            });

            setIsLoading(false);
            onMapLoad?.();
          } catch (error) {
            const err =
              error instanceof Error
                ? error
                : new Error("Failed to initialize map");
            throw err;
          }
        };

        await loadGoogleMapsScript(apiKey);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Unknown error occurred");
        showError(error.message);
        onMapError?.(error);
        setIsLoading(false);
      }
    };

    initializeMap();

    return () => {
      removeGoogleMapsScript();
    };
  }, [center, zoom, mapId, onMapLoad, onMapError]);

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center h-[400px] bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      <div
        ref={mapRef}
        style={{
          ...containerStyle,
          display: isLoading ? "none" : "block",
        }}
      />
    </>
  );
};

export default GoogleMap;
