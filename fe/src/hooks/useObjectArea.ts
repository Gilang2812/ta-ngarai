import { useDirectionStore } from "@/stores/DirectionStore";
import { useRef } from "react";

export const useObjectArea = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const { objects } = useDirectionStore();

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    if (objects.length > 0) {
      objects.forEach((obj, index) => {
        if (obj?.geom) {
          const geojson = {
            type: "Feature",
            geometry: obj.geom, // langsung pakai geometry yang kamu punya
            properties: {
              name: obj.name || `Object ${index}`, // opsional, bisa dikosongkan juga
            },
          };

          map.data.addGeoJson(geojson as GeoJSON.Feature); // pastikan cast ke tipe yang benar
        }
      });
    }
  };

  return { onMapLoad };
};
