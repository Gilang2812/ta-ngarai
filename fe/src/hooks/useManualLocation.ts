import { useCallback, useState } from "react"

export const useSetManualLocation = ()=>{
    const [clickedPosition,setClickedPosition] = useState<google.maps.LatLngLiteral|null>(null)
    const [isClickMapActivce,setIsClickMapActive] = useState(false)

    const toggleManualLocation = ()=>{
            setIsClickMapActive(prev=>!prev)
            if(clickedPosition) setClickedPosition(null)
    }

    const handleManualLocation =useCallback( (e:google.maps.MapMouseEvent)=>{
        if(e.latLng &&isClickMapActivce){
            setClickedPosition({
                lat:e.latLng.lat(),
                lng:e.latLng.lng()
            })
        }
    },[isClickMapActivce])
    return {clickedPosition,handleManualLocation,toggleManualLocation,isClickMapActivce}
}