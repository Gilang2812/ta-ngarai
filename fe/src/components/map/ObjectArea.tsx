import { useDirectionStore } from "@/stores/DirectionStore";
import { useGoogleMap } from "@react-google-maps/api";
import { useEffect, useRef } from "react";
import MapMarker from "./MapMarker";
import { getCentroid } from "@/utils/common/getCentroid";
import InfoWindowObject from "./InfoWindowObject";
import { useInfoWindow } from "@/hooks/useInfoWindow";

export const ObjectArea = () => {
  const map = useGoogleMap();
  const { objects } = useDirectionStore();
  const markersRef = useRef<(google.maps.Marker | null)[]>([]);

  useEffect(() => {
    if (!map || !(objects.length > 0)) return;
    const geo = {
      type: "FeatureCollection",
      features: objects
        .filter((ob) => ob.geom)
        .map((ob) => ({
          type: "Feature",
          geometry: ob.geom,
          properties: {
            name: ob.name,
          },
        })),
    };

    const data = new google.maps.Data({ map });
    data.addGeoJson(geo);

    data.setStyle({
      fillColor: "#f94144",
      strokeColor: "#fccfcf",
      fillOpacity: 0.4,
      strokeWeight: 1,
    });
    return () => data.setMap(null);
  }, [map, objects]);

  const { open, toggleInfoWindow } = useInfoWindow();

  return (
    objects.length > 0 &&
    objects.map((ob, index) => (
      <MapMarker
        key={index}
        label={{ text: (String.fromCharCode(65 + index)), color: "white" }}
        position={getCentroid(ob.geom)}
        onClick={() => toggleInfoWindow(index)}
        onLoad={(marker) => {
          markersRef.current[index] = marker;
        }}
      >
        {open === index && (
          <InfoWindowObject
            object={ob}
            onCloseClick={() => {
              toggleInfoWindow(index);
            }}
            position={getCentroid(ob.geom)}
            book_homestay={false}
            anchor={markersRef.current[index]}
          />
        )}
      </MapMarker>
    ))
  );
};
