import { LANDMARK_POSITION } from "@/lib/objectLandmark";
import { cornerError } from "@/utils/AlertUtils";
import { useCallback, useEffect, useRef, useState } from "react";

export const useUserNavigation = ()=>{
    const [locationError, setLocationError] = useState<string | null>(null);
    const [userLocation, setUserLocation] =
      useState<google.maps.LatLngLiteral | null>(null);
    const [directions, setDirection] =
      useState<google.maps.DirectionsResult | null>(null);
    const [tracking, setTracking] = useState(false);
  
    const lastUserLocationRef = useRef<google.maps.LatLngLiteral | null>(null);
  
    const handleLocateUser = useCallback(() => {
      if(directions)setDirection(null)
        console.log(directions)
  
      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by this browser.");
        return;
      }
      setLocationError(null);
      setTracking((prev) => !prev);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(
            `Akurasi: ${position.coords.accuracy} meter\n` +
              `Ketinggian: ${position.coords.altitudeAccuracy} meter`
          );
          setUserLocation((prevLocation) => {
            if (
              prevLocation &&
              prevLocation.lat === userPos.lat &&
              prevLocation.lng === userPos.lng
            ) {
              setTracking(false)
              return null;
            }
            return userPos;
          });
        },
        (err) => {
          setLocationError("gagal menadapatkan locasi: " + err.message);
          setTracking(false);
        },
        {
          timeout: 5000,
          enableHighAccuracy: true,
        }
      );
    }, [directions]);
  
    useEffect(() => {
      if (!userLocation || !tracking) return;
      lastUserLocationRef.current = userLocation;
  
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: userLocation,
          destination: LANDMARK_POSITION,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirection( result);
          } else {
            cornerError("cannot fetching directions");
          }
        }
      );
    }, [userLocation, tracking]);

    return {handleLocateUser,tracking,userLocation,directions,locationError}
}