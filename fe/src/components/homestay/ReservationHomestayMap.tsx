import React, { useEffect } from "react";
import { MultiPolygon } from "geojson";
import { MapMarker } from "../map";
import { getCentroid } from "@/utils/common/getCentroid";
import { useGoogleMap } from "@react-google-maps/api";
import { geometryToFeature } from "@/lib/geoJsonHelper";

type Props = {
  geom?: MultiPolygon;
};

const ReservationHomestayMap = ({ geom }: Props) => {
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

  return geojson && <MapMarker position={getCentroid(geom)} />;
};

export default ReservationHomestayMap;
