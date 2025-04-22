import { useDirectionStore } from "@/stores/DirectionStore";
import { useGoogleMap } from "@react-google-maps/api";
import { useEffect } from "react";
import MapMarker from "./MapMarker";
import { getCentroid } from "@/utils/common/getCentroid";

export const ObjectArea = () => {
  const map = useGoogleMap();
  const { objects } = useDirectionStore();

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
  return (
    objects.length > 0 &&
    objects.map((ob, index) => (
      <MapMarker
        key={index}
        label={{ text: (index + 1).toString(), color: "white" }}
        position={getCentroid(ob.geom)}
      />
    ))
  );
};
