import { apiKey } from "@/lib/googleMap";
import { LANDMARK_POSITION } from "@/lib/objectLandmark";
import { DrawingManager, GoogleMap, Polygon } from "@react-google-maps/api";
import MapSkeletonLoader from "../loading/MapSkeleton";
import { useMapLoad } from "@/hooks/useMapLoad";
import { MultiPolygon } from "geojson";
import MapMarker from "./MapMarker";
import { getCentroid } from "@/utils/common/getCentroid";
import { useDrawingMap } from "@/hooks/useDrawingMap";

type Props = React.ComponentProps<typeof GoogleMap> & {
  geom: MultiPolygon;
  formType: "create" | "edit";
};
const containerStyle = {
  width: "100%",
  aspectRatio: 4 / 3,
};

const GoogleMapDrawing = ({ geom, formType, ...props }: Props) => {
  const { isLoaded } = useMapLoad();
  const { onPolygonComplete, polygonRef, updateCoordinates } = useDrawingMap();

  const coordinates =
    geom &&
    geom?.coordinates[0][0].map((coor) => ({
      lng: coor[0],
      lat: coor[1],
    }));

  const onLoad = (polygon: google.maps.Polygon) => {
    polygonRef.current = polygon;

    const path = polygon.getPath();

    // Listener ketika titik polygon diubah
    path.addListener("set_at", updateCoordinates);
    path.addListener("insert_at", updateCoordinates);
    path.addListener("remove_at", updateCoordinates);
  };

  if (!isLoaded) return <MapSkeletonLoader />;
  if (!apiKey) return <div>Google Maps API key is missing</div>;
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        formType == "edit" && geom ? getCentroid(geom) : LANDMARK_POSITION
      }
      zoom={20}
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
      {formType == "edit" && geom ? (
        <>
          <Polygon
            path={coordinates}
            draggable={true}
            editable={true}
            onLoad={onLoad}
            onMouseUp={updateCoordinates}
            options={{
              fillColor: "#435ebe",
              fillOpacity: 0.3,
              strokeColor: "#4285F4",
              strokeWeight: 2,
              editable: true,
              draggable: true,
            }}
          />
          <MapMarker position={getCentroid(geom)} />
        </>
      ) : (
        <DrawingManager
          onPolygonComplete={(poly) => {
            onPolygonComplete(poly);
          }}
          drawingMode={google.maps.drawing.OverlayType.POLYGON}
          options={{
            drawingControl: true,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
            },
            polygonOptions: {
              fillColor: "#435ebe",
              fillOpacity: 0.3,
              strokeColor: "#4285F4",
              strokeWeight: 2,
              editable: true,
              draggable: true,
            },
          }}
        />
      )}
    </GoogleMap>
  );
};

export default GoogleMapDrawing;
