import { useRef } from "react";

export const useMapControls = ()=>{
      const mapRef = useRef<google.maps.Map | null>(null);
    return {mapRef}
}