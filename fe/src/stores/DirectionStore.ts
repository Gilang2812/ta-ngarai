import {
  type DirectionsResult,
  type LatLngLiteral,
} from "@/type/common/MapType";
import { create } from "zustand"; 

type DirectionStore = {
  direction: DirectionsResult | null;
  wayPoints: LatLngLiteral[];
  directions: DirectionsResult[];
  origin: LatLngLiteral | null;
  destination: LatLngLiteral | null;
  setwayPoints: (wayPoints: LatLngLiteral[]) => void;
  clearWayPoints :()=>void
  setDirection: (dir: DirectionsResult) => void;
  addDirections: (dir: DirectionsResult) => void;
  setOption: (origin: LatLngLiteral, direction: LatLngLiteral) => void;
  clearDirection: () => void;
  clearOption: () => void;
};

export const useDirectionStore = create<DirectionStore>((set) => ({
  direction: null,
  directions: [],
  wayPoints: [],
  origin: null,
  destination: null,
  setwayPoints: (wayPoints) => set({ wayPoints: wayPoints }),
  setDirection: (dir) => set({ direction: dir }),
  addDirections: (dir) =>
    set((state) => ({ directions: [...state.directions, dir] })),
  clearDirection: () => set({ direction: null }),
  setOption: (origin, destination) => set({ origin, destination }),
  clearOption: () => set({ origin: null, destination: null }),
  clearWayPoints: () => set({wayPoints:[] }),
}));
