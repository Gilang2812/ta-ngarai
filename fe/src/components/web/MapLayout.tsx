"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import MapSkeleton from "../loading/MapSkeleton";
import { LANDMARK_POSITION } from "@/lib/objectLandmark";

const containerStyle = {
  width: "100%",
  aspectRatio: 4 / 3,
};

type Props = React.ComponentProps<typeof GoogleMap> & {
  children?: React.ReactNode;
};

function MapLayout({ children, ...props }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
 

 
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!isLoaded) return <MapSkeleton />;
  if (!apiKey) {
    return <div>Google Maps API key is missing</div>;
  }
  return (
    
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={LANDMARK_POSITION}
        zoom={9}
        mapTypeId="satellite"
        {...props}
      >
        {children}
        <Marker
          icon={{
            url: "/images/marker-kage.png",
            scaledSize: new google.maps.Size(40, 70),
          }}
          animation={google.maps.Animation.DROP}
          position={LANDMARK_POSITION}
        />
      </GoogleMap> 
  );
}

export default MapLayout;
