import { useTravelRouteStore } from "@/stores/TravelRouteStore";
import { useUserPositionStore } from "@/stores/UserPositionStore";
import { confirmAlert, cornerAlert, cornerError } from "@/utils/AlertUtils";
import { useCallback } from "react";
import { useTools } from "./useTools";
const useTravelRoute = () => {
  const { addRoute, removeRoute, routes, removeAllRoutes } =
    useTravelRouteStore();
  const { toggleAround, aroundOpen } = useTools();
  const { userPosition } = useUserPositionStore();

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
    if (lastRoute && lastRoute.lat === userPosition.lat && lastRoute.lng === userPosition.lng) {
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

  const handleCreateRoute = useCallback(() => {
    console.log("routes", routes);
    if (!userPosition) {
      cornerError("Please set your location.");
      return;
    }
    if (!aroundOpen) {
      toggleAround();
    }
    const existingRoute = routes.find((route) => route.id === "1");
    if (!existingRoute) {
      addRoute({
        id: "1",
        name: "MyLocation",
        lat: userPosition?.lat || 0,
        lng: userPosition?.lng || 0,
      });
      console.log(routes);
    }
  }, [userPosition, routes]);

  return {
    addRoute,
    removeRoute,
    routes,
    handleRemoveRoute,
    handleAddUniqueRoute,
    removeAllRoutes,
    handleReturnToUserLocation,
    handleCreateRoute,
  };
};

export default useTravelRoute;
