"use client";
import { useEffect, useRef, useState } from "react";
import { Marker } from "@react-google-maps/api";
import { LANDMARK_POSITION } from "@/lib/objectLandmark";



type AirplaneProps = {
  origin: google.maps.LatLngLiteral;
  duration?: number;
  delay?: number;
  onArrival?: () => void;
};

export const AirplaneToLandmark = ({ 
  origin, 
  duration = 5000,
  delay = 0,
  onArrival
}: AirplaneProps) => {
  const AIRPLANE_ICON = {
    url: "/icons/plane.svg",
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 20)
  };
  const [currentPosition, setCurrentPosition] = useState(origin);
  const [rotation, setRotation] = useState(0);
  const [hasArrived, setHasArrived] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = performance.now();
      const destination = LANDMARK_POSITION;

      const animate = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const newPosition = {
          lat: origin.lat + (destination.lat - origin.lat) * progress,
          lng: origin.lng + (destination.lng - origin.lng) * progress
        };
        
        const angle = calculateBearing(currentPosition, newPosition);
        setRotation(angle);
        setCurrentPosition(newPosition);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setHasArrived(true);
          onArrival?.();
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [origin, duration, delay, onArrival]);

  const calculateBearing = (start: google.maps.LatLngLiteral, end: google.maps.LatLngLiteral) => {
    const toRad = (deg: number) => deg * (Math.PI / 180);
    const startLat = toRad(start.lat);
    const startLng = toRad(start.lng);
    const endLat = toRad(end.lat);
    const endLng = toRad(end.lng);

    const y = Math.sin(endLng - startLng) * Math.cos(endLat);
    const x = Math.cos(startLat) * Math.sin(endLat) -
              Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);
    let bearing = Math.atan2(y, x);
    bearing = bearing * (180 / Math.PI);
    return (bearing + 360) % 360;
  };

  if (hasArrived) return null;

  return (
    <Marker
      position={currentPosition}
      icon={{
        ...AIRPLANE_ICON,
        rotation
      }}
      zIndex={1000}
    />
  );
};