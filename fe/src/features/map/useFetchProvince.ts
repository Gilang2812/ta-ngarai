import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchProvince = (isProvinsiChecked=true)=>{
    return useQuery<GeoJSON.FeatureCollection>({
        queryKey:['province'],
        queryFn:async()=>{
            const {data} = await axiosInstance.get('/geo/province')
            return data
        },
        enabled:isProvinsiChecked
    })
}