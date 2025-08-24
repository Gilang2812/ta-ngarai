import { useAxiosAuth } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchKabKota = (isKabKotaChecked=true)=>{
    const axiosInstance = useAxiosAuth()
 return useQuery<GeoJSON.FeatureCollection>({
        queryKey:['kabkota'],
        queryFn:async()=>{
            const { data } = await axiosInstance.get('/geo/kabkota')
            return data
        },
        enabled:isKabKotaChecked
    })
}