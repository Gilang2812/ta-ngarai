import { useAxiosAuth } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchKecamatan = (isKecamatanChecked=true)=>{
    const axiosInstance = useAxiosAuth()
 return useQuery<GeoJSON.FeatureCollection>({
        queryKey:['kecamatan'],
        queryFn:async()=>{
            const { data } = await axiosInstance.get('/geo/kecamatan')
            return data
        },
    enabled:isKecamatanChecked
    })
}