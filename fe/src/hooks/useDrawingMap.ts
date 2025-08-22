import { getCentroid } from "@/utils/common/getCentroid";
import { useFormikContext } from "formik";
import { MultiPolygon } from "geojson";
import { useRef } from "react";

export const useDrawingMap = () => {
  const { setFieldValue, values } = useFormikContext<{
    latitude: number;
    longitude: number;
    geom: string;
  }>();
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleGotoCoordinate = () => {
    mapRef?.current?.setZoom(19);
    mapRef?.current?.panTo({ lat: values.latitude, lng: values.longitude });
  };

  const handleRemovePolygon = () => {
    const geomCenter =
      values.geom &&
      getCentroid(
        typeof values.geom === "string" ? JSON.parse(values.geom) : values.geom
      );
    if (values.geom) {
      setFieldValue(
        "latitude",
        (typeof geomCenter === "object" && geomCenter?.lat) || 0
      );
      setFieldValue(
        "longitude",
        (typeof geomCenter === "object" && geomCenter?.lng) || 0
      );
    }
    setFieldValue("geom", "");
  };

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    const path = polygon.getPath().getArray();
    const coordinates = path.map((latlng) => [latlng.lng(), latlng.lat()]);
    coordinates.push(coordinates[0]);
    const geoJsonFeature: MultiPolygon = {
      type: "MultiPolygon",
      coordinates: [[coordinates]],
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
    }
  };
  return {
    onPolygonComplete,
    updateCoordinates,
    polygonRef,
    handleGotoCoordinate,
    mapRef,
    handleRemovePolygon,
  };
};
