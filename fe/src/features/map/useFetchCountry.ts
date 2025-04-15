import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchCountry = (isCountryChecked=true)=>{
    return useQuery<GeoJSON.FeatureCollection>({
        queryKey:['country'],
        queryFn:async()=>{
            const {data} = await axiosInstance.get('/geo/country')
            return data
        },
        enabled:isCountryChecked
    })
}