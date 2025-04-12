import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchKecamatan = ()=>{
    return useQuery({
        queryKey:['kecamatan'],
        queryFn:async()=>{
            const {data} = await axiosInstance.get('/geo/kecamatan')
            return data
        }
    })
}