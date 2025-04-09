import { useState } from "react"

export const useShowLegend = ()=>{
    const [isShowLegend,setShowLegend] = useState(false)

    const toggleLegend = ()=>{
            setShowLegend(prev=>!prev)
    }
    return {isShowLegend, toggleLegend}
}