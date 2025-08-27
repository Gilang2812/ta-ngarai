import { geometryToFeature } from "@/lib/geoJsonHelper";
import { useGoogleMap } from "@react-google-maps/api";
import { MultiPolygon } from "geojson";
import { useEffect } from "react";

const useDigitasi = (geom: MultiPolygon) => {
  const map = useGoogleMap();
  const geojson = geom && geometryToFeature(geom);
  useEffect(() => {
    if (!geojson || !map) return;
    const data = new google.maps.Data();
    data.addGeoJson(geojson);
    data.setMap(map);
    data.setStyle({
      fillColor: "red",
      strokeWeight: 1,
      strokeColor: "white",
      fillOpacity: 0.1,
    });
    return () => {
      data.setMap(null);
    };
  }, [geojson, map]);
};

export default useDigitasi;
