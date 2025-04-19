import {
  DirectionsResult,
  DirectionsWaypoint,
  LatLngLiteral,
  TravelMode,
} from "@/type/common/MapType";
import { cornerError } from "@/utils/AlertUtils";
import { useCallback, useEffect, useRef, useState } from "react";

type DirectionsState = {
  result: DirectionsResult | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  distance?: string;
  duration?: string;
};

type DirectionsRequest = {
  origin: LatLngLiteral | string;
  destination: LatLngLiteral | string;
  travelMode?: TravelMode;
  waypoints?: DirectionsWaypoint[];
  optimizeWaypoints?: boolean;
  avoidHighways?: boolean;
  avoidTolls?: boolean;
  unitSystem?: google.maps.UnitSystem;
};
export const useDirections = () => {
  const [state, setState] = useState<DirectionsState>({
    result: null,
    isLoading: false,
    error: null,
    isSuccess: false,
  });

  const directionServiceRef = useRef<google.maps.DirectionsService | null>(
    null
  );

  useEffect(() => {
    directionServiceRef.current = new google.maps.DirectionsService();
    return () => {
      directionServiceRef.current = null;
    };
  }, []);

  const calculateDirections = useCallback(
    async (request: DirectionsRequest) => {
      if (!directionServiceRef.current) {
        setState((prev) => ({
          ...prev,
          error: "Diretion Service not Availabe",
        }));
        return null;
      }
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        isSuccess: false,
      }));

      try {
        const result = await directionServiceRef.current?.route({
          origin: request.origin,
          destination: request.destination,
          travelMode: request.travelMode || google.maps.TravelMode.DRIVING,
          waypoints: request.waypoints,
          optimizeWaypoints: request.optimizeWaypoints,
          avoidHighways: request.avoidHighways,
          avoidTolls: request.avoidTolls,
          unitSystem: request.unitSystem,
        });

        const leg = result?.routes[0].legs[0];

        setState({
          result,
          isLoading: false,
          error: null,
          isSuccess: true,
          distance: leg?.distance?.text,
          duration: leg?.duration?.text,
        });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "failed to calculate directions";
        cornerError(message);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: message,
          isSuccess: false,
        }));
        return null;
      }
    },
    []
  );
  const resetDirections = useCallback(() => {
    setState({
      result: null,
      isLoading: false,
      error: null,
      isSuccess: false,
      distance: undefined,
      duration: undefined,
    });
  }, []);
  return {
    directions: state.result,
    calculateDirections,
    resetDirections,
    isLoading: state.isLoading,
    error: state.error,
    isSuccess: state.isSuccess,
    distance: state.distance,
    duration: state.duration,
  };
};
