import { useEffect, useRef, useState } from "react";

export const useAirPlane = (
  origin: google.maps.LatLngLiteral,
  destination: google.maps.LatLngLiteral,
  duration = 5000,
  delay = 0,
  showAirPlane:boolean
) => {
  const [currentPosition, setCurrentPosition] = useState(origin);
  const [rotation, setRotation] = useState(0);
  const [hasArrived, setHasArrived] = useState(false);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = performance.now();

      const animate = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const newPosition = {
          lat: origin.lat + (destination.lat - origin.lat) * progress,
          lng: origin.lng + (destination.lng - origin.lng) * progress,
        };

        const angle = calculateBearing(currentPosition, newPosition);
        setRotation(angle);
        setCurrentPosition(newPosition);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
          setHasArrived(false);
        } else {
          setHasArrived(true);
          setCurrentPosition(destination);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (!showAirPlane) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }
    };
  }, [origin, destination, duration, delay,showAirPlane]);

  return { currentPosition, rotation, hasArrived };
};

const calculateBearing = (
  start: google.maps.LatLngLiteral,
  end: google.maps.LatLngLiteral
): number => {
  const toRad = (deg: number) => deg * (Math.PI / 180);
  const startLat = toRad(start.lat);
  const startLng = toRad(start.lng);
  const endLat = toRad(end.lat);
  const endLng = toRad(end.lng);

  const y = Math.sin(endLng - startLng) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);
  let bearing = Math.atan2(y, x);
  bearing = bearing * (180 / Math.PI);
  return (bearing + 360) % 360;
};
