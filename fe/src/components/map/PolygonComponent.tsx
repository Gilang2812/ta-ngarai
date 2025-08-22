import { getCentroid } from "@/utils/common/getCentroid";
import { GoogleMap, Polygon } from "@react-google-maps/api";
import { useFormikContext } from "formik";
import { ComponentProps, useEffect, useState } from "react";
import MapMarker from "./MapMarker";
import { MultiPolygon } from "geojson";
import { LANDMARK_POSITION } from "@/lib/objectLandmark";
const containerStyle = {
  width: "100%",
  aspectRatio: 4 / 3,
};
export const PolygonComponent = ({
  mapRef,
  geom,
  polygonRef,
  updateCoordinates,
  ...props
}: ComponentProps<typeof GoogleMap> & {
  geom: MultiPolygon | null;
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  updateCoordinates: () => void;
  polygonRef: React.MutableRefObject<google.maps.Polygon | null>;
}) => {
  const [show, setShow] = useState(false);
  const { values } = useFormikContext<{ geom: string }>();
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);
  const coordinates =
    values.geom &&
    geom?.coordinates[0][0].map((coor) => ({
      lng: coor[0],
      lat: coor[1],
    }));
  if (!show) return null;
  const onLoad = (polygon: google.maps.Polygon) => {
    polygonRef.current = polygon;

    const path = polygon.getPath();

    // Listener ketika titik polygon diubah
    path.addListener("set_at", updateCoordinates);
    path.addListener("insert_at", updateCoordinates);
    path.addListener("remove_at", updateCoordinates);
  };
  return (
    <GoogleMap
      onLoad={(map) => {
        mapRef.current = map;
      }}
      mapContainerStyle={containerStyle}
      center={values.geom && geom ? getCentroid(geom) : LANDMARK_POSITION}
      zoom={19}
      mapTypeId="satellite"
      options={{
        disableDefaultUI: true,
        mapTypeId: "satellite",
        zoomControl: true,
        fullscreenControl: true,
        mapTypeControl: true,
        streetViewControl: true,
        gestureHandling: "greedy",
      }}
      {...props}
    >
      {values.geom && geom && (
        <>
          <Polygon
            path={coordinates || []}
            draggable
            editable
            onLoad={onLoad}
            onMouseUp={updateCoordinates}
            options={{
              fillColor: "#435ebe",
              fillOpacity: 0.3,
              strokeColor: "#4285F4",
              strokeWeight: 2,
              editable: true,
              draggable: true,
              visible: !!values.geom,
            }}
          />
          {values.geom && geom && <MapMarker position={getCentroid(geom)} />}
        </>
      )}
    </GoogleMap>
  );
};
