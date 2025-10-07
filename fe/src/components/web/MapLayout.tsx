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

type Props = React.ComponentProps<typeof GoogleMap> & {
  children?: React.ReactNode;
  origin?: LatLngLiteral | null;
  hideAllLayer?: () => void;
  containerStyle?: React.CSSProperties;
};

function MapLayout({
  children,
  hideAllLayer,
  zoom,
  containerStyle = {
    width: "100%",
    aspectRatio: 4 / 3,
  },
  ...props
}: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useMapLoad();
  const [isOpen, setIsOpen] = useState(false);
  const { setResponse } = useDirectionStore();
  const { routes } = useTravelRoute();
  const toggleInfoWindow = useCallback(() => setIsOpen((prev) => !prev), []);

  if (!isLoaded) return <MapSkeleton />;
  if (!apiKey) return <div>Google Maps API key is missing</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={props.center || LANDMARK_POSITION}
      zoom={zoom || 6}
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
      {children}
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
