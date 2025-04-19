import { LatLngLiteral } from '@/type/common/MapType';
import { useDirections } from "@/hooks/useDirection";
import { create } from "zustand";

 
export const directionStore = create((set)=>({
    directions : null,
    calculateDirection : ()=>set()
}))