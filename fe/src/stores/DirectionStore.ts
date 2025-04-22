import {
  type DirectionsResult,
  type LatLngLiteral,
} from "@/type/common/MapType";
import { SimplifiedObject } from "@/type/schema/PackageSchema";
import { create } from "zustand";

type DirectionStore = {
  direction: DirectionsResult | null;
  objects: SimplifiedObject[];
  directions: DirectionsResult[];
  origin: LatLngLiteral | null;
  destination: LatLngLiteral | null;
  setObject: (objects: SimplifiedObject[]) => void;
  clearObject: () => void;
  setDirection: (dir: DirectionsResult) => void;
  addDirections: (dir: DirectionsResult) => void;
  setOption: (origin: LatLngLiteral, direction: LatLngLiteral) => void;
  clearDirection: () => void;
  clearOption: () => void;
};

export const useDirectionStore = create<DirectionStore>((set) => ({
  direction: null,
  directions: [],
  objects: [],

  origin: null,
  destination: null,
  setObject: (object) => set({ objects: object }),
  setDirection: (dir) => set({ direction: dir }),
  addDirections: (dir) =>
    set((state) => ({ directions: [...state.directions, dir] })),
  clearDirection: () => set({ direction: null }),
  setOption: (origin, destination) => set({ origin, destination }),
  clearOption: () => set({ origin: null, destination: null }),
  clearObject: () => set({ objects: [] }),
}));
