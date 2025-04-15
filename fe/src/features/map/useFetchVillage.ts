import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchVillage = (isVillageChecked=true)=>{
    return useQuery<GeoJSON.FeatureCollection>({
        queryKey:['village'],
        queryFn:async()=>{
            const {data} = await axiosInstance.get('/geo/village')
            return data
        },
        enabled:isVillageChecked
    })
}