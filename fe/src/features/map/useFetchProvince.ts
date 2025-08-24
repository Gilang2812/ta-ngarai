import { useAxiosAuth } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchProvince = (isProvinsiChecked=true)=>{
    const axiosInstance = useAxiosAuth()
 return useQuery<GeoJSON.FeatureCollection>({
        queryKey:['province'],
        queryFn:async()=>{
            const { data } = await axiosInstance.get('/geo/province')
            return data
        },
        enabled:isProvinsiChecked
    })
}