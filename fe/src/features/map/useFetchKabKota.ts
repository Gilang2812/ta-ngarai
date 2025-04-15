import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchKabKota = (isKabKotaChecked=true)=>{
    return useQuery<GeoJSON.FeatureCollection>({
        queryKey:['kabkota'],
        queryFn:async()=>{
            const {data} = await axiosInstance.get('/geo/kabkota')
            return data
        },
        enabled:isKabKotaChecked
    })
}