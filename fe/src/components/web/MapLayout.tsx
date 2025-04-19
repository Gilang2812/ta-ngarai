"use client";

import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import MapSkeleton from "../loading/MapSkeleton";
import { LANDMARK_POSITION } from "@/lib/objectLandmark";
import { MapMarker } from "../map";
import { useCallback, useState } from "react";
import { FaRoad, FaSpa } from "react-icons/fa6";
import { useDirections } from "@/hooks/useDirection";
import { LatLngLiteral } from "@/type/common/MapType";
import { cornerAlert } from "@/utils/AlertUtils";
import Button from "../common/Button";

const containerStyle = {
  width: "100%",
  aspectRatio: 4 / 3,
};

type Props = React.ComponentProps<typeof GoogleMap> & {
  children?: React.ReactNode;
  origin?: LatLngLiteral | null;
};

function MapLayout({ children, origin, ...props }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey || "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleInfoWindow = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const DirectionButton = () => {
    const { directions, calculateDirections } = useDirections();
    return (
      <>
        <Button
        variant={'primary'}
          onClick={() => {
            if (!origin) {
              return cornerAlert("set location first");
            }
            calculateDirections({
              destination: LANDMARK_POSITION,
              origin,
            });
          }}
          className="p-2"
          type="button"
        >
          <FaRoad />
        </Button>
        {directions && <DirectionsRenderer directions={directions} />}
      </>
    );
  };
  if (!isLoaded) return <MapSkeleton />;
  if (!apiKey) {
    return <div>Google Maps API key is missing</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={LANDMARK_POSITION}
      zoom={6}
      mapTypeId="satellite"
      {...props}
    >
      <div>hello world</div>
      {children}
      <MapMarker
        icon={{
          url: "/images/marker-kage.png",
          scaledSize: new google.maps.Size(40, 70),
        }}
        position={LANDMARK_POSITION}
        onClick={toggleInfoWindow}
      >
        {isOpen && (
          <InfoWindow onCloseClick={toggleInfoWindow}>
            <article className=" space-y-2 p-2 rounded text-center [&_h3]:font-bold ">
              <h3>Koto Gadang Tourism Village</h3>
              <section className="text-sm flex items-center justify-center">
                <FaSpa />
                <p>Tourism Village</p>
              </section>
              <section className="flex items-center justify-center">
                <DirectionButton />
              </section>
            </article>
          </InfoWindow>
        )}
      </MapMarker>
    </GoogleMap>
  );
}

export default MapLayout;
