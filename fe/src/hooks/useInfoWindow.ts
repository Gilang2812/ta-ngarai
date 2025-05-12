import { useCallback, useState } from "react"

export const useInfoWindow = ()=>{
    const [open, setOpen] = useState<number|null>(null)

    const toggleInfoWindow = useCallback((index:number)=>setOpen(prev=>prev===index?null:index),[])

    return {open,toggleInfoWindow}
}