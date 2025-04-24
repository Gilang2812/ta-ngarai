 
import { useUserPositionStore } from "@/stores/UserPositionStore";
import { LatLngLiteral } from "@/type/common/MapType";
import { useGoogleMap } from "@react-google-maps/api";
import { useEffect, useRef } from "react";
type ObjectAround = {
  center: LatLngLiteral | null;
};
export const ObjectAround = () => {
 
  const { userPosition: center,radius } = useUserPositionStore();
  const map = useGoogleMap();
  const circleRef = useRef<google.maps.Circle | null>(null);
  useEffect(() => {
    if (!map || !center || !radius) return;
    console.log(center);
    console.log(radius);
    if (circleRef.current) {
      circleRef.current.setMap(null);
    }
    const radiusCircle = new google.maps.Circle({
      center: center,
      radius: radius,
      map: map,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.1,
    });

    circleRef.current = radiusCircle;

    const bounds = radiusCircle.getBounds();
    if (bounds) {
      map.fitBounds(bounds);
    }
    return () => {
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    };
  }, [center, radius, map]);

  return null;
};
