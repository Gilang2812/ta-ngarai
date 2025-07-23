import { create } from "zustand";

type RouteProps = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

type TravelRouteStore = {
  routes: RouteProps[];
  addRoute: (route: RouteProps) => void;
  removeRoute: (index: number) => void;
  removeAllRoutes: () => void;
};

export const useTravelRouteStore = create<TravelRouteStore>((set) => ({
  routes: [],
  addRoute: (route) => set((state) => ({ routes: [...state.routes, route] })),
  removeRoute: (index) =>
    set((state) => ({ routes: state.routes.filter((_, i) => i !== index) })),
  removeAllRoutes: () => set(() => ({ routes: [] })),
}));
