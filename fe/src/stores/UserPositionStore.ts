import { LatLngLiteral } from "@/types/common/MapType";
import { create } from "zustand";

type UserPositionStore = {
  userPosition: LatLngLiteral | null;
  radius: number|null
  setRadius: (radius: number|null) => void;
  setUserPosition: (coor: LatLngLiteral|null) => void;
};
export const useUserPositionStore = create<UserPositionStore>((set) => ({
    userPosition:null,
    setUserPosition:(coor)=>set({userPosition:coor}),
    radius: null,
    setRadius: (radius) => set({ radius }),
}));
