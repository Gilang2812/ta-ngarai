import { useAttachmentStore } from "@/stores/attachmentStore";
import { useEffect, useState } from "react";

// Koordinat kursor

export const useMapHandler = (mapRef: google.maps.Map | null) => {
  const [zoomLevel, setZoomLevel] = useState<number>(14);
  const { setCursorPos } = useAttachmentStore();
  useEffect(() => {
    if (mapRef) {
      // Koordinat kursor
      google.maps.event.addListener(
        mapRef,
        "mousemove",
        (e: google.maps.MapMouseEvent) => {
          setCursorPos({
            lat: e.latLng!.lat(),
            lng: e.latLng!.lng(),
          });
        }
      );

      // Kompas berputar
      mapRef.addListener("heading_changed", () => {
        const heading: number = mapRef.getHeading() || 0;
        const compassElement = document?.getElementById("compass");
        if (compassElement) {
          compassElement.style.transform = `rotate(${-heading}deg)`;
        }
      });
    }
  }, [mapRef, setCursorPos]);

  return {
    zoomLevel,
    setZoomLevel,
  };
};
