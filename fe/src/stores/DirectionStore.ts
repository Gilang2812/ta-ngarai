import {
  type DirectionsResult,
  type LatLngLiteral,
} from "@/types/common/MapType";
import { SimplifiedObject } from "@/types/schema/PackageSchema";
import { create } from "zustand";

type DirectionStore = {
  direction: DirectionsResult | null;
  objects: SimplifiedObject[];
  origin: LatLngLiteral | null;
  destination: LatLngLiteral | null;
  setObject: (objects: SimplifiedObject[]) => void;
  clearObject: () => void;
  setDirection: (dir: DirectionsResult | null) => void;
  setOption: (origin: LatLngLiteral, direction: LatLngLiteral) => void;
  clearDirection: () => void;
  clearOption: () => void;
  response: DirectionsResult | null;
  setResponse: (res: DirectionsResult | null) => void;
};

export const useDirectionStore = create<DirectionStore>((set) => ({
  direction: null,
  objects: [],
  response: null,
  origin: null,
  destination: null,
  setObject: (object) => set({ objects: object }),
  setDirection: (dir) => set({ direction: dir }),
  clearDirection: () => set({ direction: null }),
  setOption: (origin, destination) => set({ origin, destination }),
  clearOption: () => set({ origin: null, destination: null, direction: null }),
  clearObject: () => set({ objects: [], response: null }),
  setResponse: (res) => set({ response: res }),
}));
