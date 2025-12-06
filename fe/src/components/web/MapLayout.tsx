"use client";

import { GoogleMap, InfoWindow } from "@react-google-maps/api";
import MapSkeleton from "../loading/MapSkeleton";
import { LANDMARK_POSITION } from "@/lib/objectLandmark";
import { MapMarker } from "../map";
import { LatLngLiteral } from "@/types/common/MapType";
import { ActivityDirections } from "../map/ActivityDirections";
import { useCallback, useState } from "react";
import { FaSpa } from "react-icons/fa6";
import { DirectionToKotoGadangButton } from "../map/DirectionToKotoGadangButton";
import { ObjectArea } from "../map/ObjectArea";
import { ObjectAround } from "../map/ObjectAround";
import { useMapLoad } from "@/hooks/useMapLoad";
import { useDirectionStore } from "@/stores/DirectionStore";
import useTravelRoute from "@/hooks/useTravelRoute";
import { useMapHandler } from "@/hooks/useMapHandler";
import { Compass } from "../map/Compass";
import { CursorPosition } from "../map/Cursor";

type Props = React.ComponentProps<typeof GoogleMap> & {
  children?: React.ReactNode;
  origin?: LatLngLiteral | null;
  hideAllLayer?: () => void;
  containerStyle?: React.CSSProperties;
  mapRef: React.MutableRefObject<google.maps.Map | null>
};

function MapLayout({
  children,
  hideAllLayer,
  zoom,
  containerStyle = {
    width: "100%",
    aspectRatio: 4 / 3,
  },
  mapRef,
  ...props
}: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useMapLoad();
  const [isOpen, setIsOpen] = useState(false);
  const { setResponse } = useDirectionStore();
  const { routes } = useTravelRoute();
  const toggleInfoWindow = useCallback(() => setIsOpen((prev) => !prev), []);
  const { setZoomLevel } = useMapHandler(mapRef?.current)
  if (!isLoaded) return <MapSkeleton />;
  if (!apiKey) return <div>Google Maps API key is missing</div>;

  return (
    <GoogleMap
      onLoad={map => { mapRef.current = map }}
      mapContainerStyle={containerStyle}
      center={props.center || LANDMARK_POSITION}
      zoom={zoom || 6}
      onZoomChanged={() => {
        if (mapRef.current) setZoomLevel(mapRef.current.getZoom()!);
      }}
      mapTypeId="satellite"
      options={{
        disableDefaultUI: true,
        mapTypeId: "satellite",
        zoomControl: true,
        fullscreenControl: true,
        mapTypeControl: true,
        scaleControl: true,
        rotateControl: true,
        streetViewControl: true,

        gestureHandling: "greedy",
      }}
      {...props}
    >
      {children}
      <Compass />
      <CursorPosition />

      <MapMarker
        icon={{
          url: "/images/marker-kage.png",
          scaledSize: new google.maps.Size(30, 45),
        }}
        position={LANDMARK_POSITION}
        onClick={toggleInfoWindow}
      >
        {isOpen && (
          <InfoWindow
            onCloseClick={() => {
              toggleInfoWindow();
              if (routes.length > 1) {
                setResponse(null);
              }
            }}
          >
            <article className="space-y-2 p-2 rounded text-center [&_h3]:font-bold">
              <h3>Koto Gadang Tourism Village</h3>
              <section className="text-sm flex items-center justify-center">
                <FaSpa />
                <p>Tourism Village</p>
              </section>
              <section className="flex items-center justify-center">
                <DirectionToKotoGadangButton destination={LANDMARK_POSITION} />
              </section>
            </article>
          </InfoWindow>
        )}
      </MapMarker>
      <ActivityDirections hideAllLayer={hideAllLayer} />
      <ObjectAround />
      <ObjectArea />
    </GoogleMap>
  );
}
MapLayout.displayName = "MapLayout";
export default MapLayout;
