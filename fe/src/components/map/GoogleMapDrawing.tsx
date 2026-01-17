"use client";
import { apiKey } from "@/lib/googleMap";
import { LANDMARK_POSITION } from "@/lib/objectLandmark";
import { DrawingManager, GoogleMap } from "@react-google-maps/api";
import MapSkeletonLoader from "../loading/MapSkeleton";
import { useMapLoad } from "@/hooks/useMapLoad";
import { MultiPolygon } from "geojson";
import MapMarker from "./MapMarker";
import { getCentroid } from "@/utils/common/getCentroid";
import { useDrawingMap } from "@/hooks/useDrawingMap";
import { useFormikContext } from "formik";
import Button from "../common/Button";
import { FaSearch } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { FormInput } from "../inputs/FormInput";
import { PolygonComponent } from "./PolygonComponent";

type Props = React.ComponentProps<typeof GoogleMap>;
const containerStyle = {
  width: "100%",
  aspectRatio: 4 / 3,
};

const GoogleMapDrawing = ({ ...props }: Props) => {
  const { values } = useFormikContext<{
    latitude: number;
    longitude: number;
    geom: string;
  }>();
  const geom =
    typeof values.geom === "string"
      ? (JSON.parse(values.geom || "{}") as MultiPolygon | null)
      : values.geom;
  const { isLoaded } = useMapLoad();
  const {
    onPolygonComplete,
    polygonRef,
    updateCoordinates,
    handleGotoCoordinate,
    mapRef,
    handleRemovePolygon,
  } = useDrawingMap();

  const notGeom =
    !values.geom || (typeof values.geom === "string" && values.geom === "null");
  if (!isLoaded) return <MapSkeletonLoader />;
  if (!apiKey) return <div>Google Maps API key is missing</div>;
  return (
    <div className="relative h-full w-full ">
      <div className="flex gap-4 items-center mb-2 top-4 left-4 z-10">
        <FormInput type="number" name="latitude" label="latitude  " />
        <FormInput type="number" name="longitude" label="longitude" />
      </div>
      <div className="flex w-full gap-4 items-center justify-between">
        <Button
          variant="primary"
          type="button"
          onClick={handleGotoCoordinate}
          disabled={!values.latitude || !values.longitude}
        >
          <FaSearch />
        </Button>
        <Button variant="regDanger" type="button" onClick={handleRemovePolygon}>
          <FaTrash />
        </Button>
      </div>
      <div className="py-4 w-full min-w-fit min-h-fit">
        {notGeom ? (
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
              scaleControl:true,
              mapTypeControl: true,
              streetViewControl: true,
              gestureHandling: "greedy",
            }}
            {...props}
          >
            <DrawingManager
              onPolygonComplete={(poly) => {
                onPolygonComplete(poly);
              }}
              drawingMode={
                !notGeom
                  ? google.maps.drawing.OverlayType.MARKER
                  : google.maps.drawing.OverlayType.POLYGON
              }
              options={{
                drawingControl: true,
                drawingControlOptions: {
                  position: window.google.maps.ControlPosition.TOP_CENTER,
                  drawingModes: [
                    window.google.maps.drawing.OverlayType.POLYGON,
                  ],
                },
                polygonOptions: {
                  fillColor: "#red",
                  fillOpacity: 0.3,
                  strokeColor: "#4285F4",
                  strokeWeight: 2,
                  editable: true,
                  draggable: true,
                },
              }}
            />
            {!notGeom && values.geom && geom && (
              <MapMarker position={getCentroid(geom)} />
            )}
          </GoogleMap>
        ) : (
          <PolygonComponent
            polygonRef={polygonRef}
            geom={geom}
            mapRef={mapRef}
            updateCoordinates={updateCoordinates}
            {...props}
          />
        )}
      </div>
    </div>
  );
};

export default GoogleMapDrawing;
