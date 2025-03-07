import { useEffect, useState } from "react"

export const useDebounce = (value:string, delay:300)=>{
        const [debounceValue, setDebounceValue] = useState(value) 

        useEffect(()=>{
            const handle = setTimeout(()=>{
                setDebounceValue(value)
            },delay)
        },[delay,value])

        return debounceValue
}