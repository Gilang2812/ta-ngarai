import { useFormikContext } from "formik";
import { MultiPolygon } from "geojson";
import { useRef } from "react";

export const useDrawingMap = () => {
  const { setFieldValue } = useFormikContext();
  const polygonRef = useRef<google.maps.Polygon | null>(null);

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    const path = polygon.getPath().getArray();
    const coordinates = path.map((latlng) => [latlng.lng(), latlng.lat()]);

    const geoJsonFeature: MultiPolygon = {
      type: "MultiPolygon",
      coordinates: [[[...coordinates, coordinates[0]]]],
    };

    setFieldValue("geom", JSON.stringify(geoJsonFeature));
  };
  const updateCoordinates = () => {
    if (polygonRef.current) {
      const path = polygonRef.current.getPath();
      const newCoords = path.getArray().map((latLng) => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
      }));

      const coordiantes = newCoords.map(({ lat, lng }) => [lng, lat]);
      const geoJsonFeature: MultiPolygon = {
        type: "MultiPolygon",
        coordinates: [[coordiantes]],
      };
      setFieldValue("geom", JSON.stringify(geoJsonFeature));
      console.log("Updated coordinates:", JSON.stringify(geoJsonFeature));
    }
  };
  return { onPolygonComplete, updateCoordinates, polygonRef };
};
