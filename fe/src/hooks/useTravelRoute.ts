import { useTravelRouteStore } from "@/stores/TravelRouteStore";
import { useUserPositionStore } from "@/stores/UserPositionStore";
import { confirmAlert, cornerAlert, cornerError } from "@/utils/AlertUtils";
import { useCallback } from "react";
import { useTools } from "./useTools";
import { useDirectionStore } from "@/stores/DirectionStore";
import Swal from "sweetalert2";
import { LANDMARK_POSITION } from "@/lib/objectLandmark";
const useTravelRoute = () => {
  const { addRoute, removeRoute, routes, removeAllRoutes } =
    useTravelRouteStore();
  const { toggleAround, aroundOpen } = useTools();
  const { setUserPosition } = useUserPositionStore();
  const { userPosition } = useUserPositionStore();
  const { setResponse } = useDirectionStore();

  const handleRemoveRoute = useCallback(
    (index: number) => {
      confirmAlert(
        "Are you sure you want to remove this route?",
        "This action cannot be undone.",
        () => {
          removeRoute(index);
        }
      );
    },
    [removeRoute]
  );

  const handleAddUniqueRoute = useCallback(
    (route: { id: string; name: string; lat: number; lng: number }) => {
      const existingRoute = routes.find((r) => r.id === route.id);
      if (existingRoute) {
        cornerAlert("this object is already in your route.");
      } else {
        addRoute(route);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userPosition, routes]
  );

  const handleReturnToUserLocation = useCallback(() => {
    if (!userPosition) {
      cornerError("User location not set.");
      return;
    }
    const lastRoute = routes[routes.length - 1];
    if (
      lastRoute &&
      lastRoute.lat === userPosition.lat &&
      lastRoute.lng === userPosition.lng
    ) {
      cornerError("You are already at your location.");
      return;
    }
    addRoute({
      id: new Date().toISOString(),
      name: "MyLocation",
      lat: userPosition.lat,
      lng: userPosition.lng,
    });
  }, [userPosition, routes, addRoute]);

  const addUserLocationRoute = useCallback(() => {
    const existingRoute = routes.find((route) => route.id === "1");
    if (!existingRoute) {
      addRoute({
        id: "1",
        name: "MyLocation",
        lat: userPosition?.lat || LANDMARK_POSITION.lat,
        lng: userPosition?.lng || LANDMARK_POSITION.lng,
      });
    }
  }, [routes, userPosition, addRoute]);

  const handleCreateRoute = useCallback(() => {
    if (!userPosition) {
      Swal.fire({
        icon: "question",
        title: "Set Location",
        showCancelButton: true,
        color: "black",
        text: "Set Your Location Using 'Manual Location' or 'Current Location' First or Would you like to Use Central of Village as you Position?",
        confirmButtonText: "Yes, Use It",
        cancelButtonText: "No, I want to Set My Location",
        cancelButtonColor: "black",
      }).then((result) => {
        if (result.isConfirmed) {
          setUserPosition(LANDMARK_POSITION);
          if (!aroundOpen) {
            toggleAround();
          }
          addRoute({
            id: "1",
            name: "Central of Koto Gadang",
            lat: LANDMARK_POSITION.lat,
            lng: LANDMARK_POSITION.lng,
          });
        }
      });
      return;
    }

    if (!aroundOpen) {
      toggleAround();
    }
    addUserLocationRoute();
  }, [
    userPosition,
    aroundOpen,
    toggleAround,
    setUserPosition,
    addUserLocationRoute,
    addRoute,
  ]);

  return {
    addRoute,
    removeRoute,
    routes,
    handleRemoveRoute,
    handleAddUniqueRoute,
    removeAllRoutes: () => {
      removeAllRoutes();
      setResponse(null);
    },
    handleReturnToUserLocation,
    handleCreateRoute,
  };
};

export default useTravelRoute;
