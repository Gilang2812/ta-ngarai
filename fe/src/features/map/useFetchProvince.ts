import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchProvince = ()=>{
    return useQuery({
        queryKey:['province'],
        queryFn:async()=>{
            const {data} = await axiosInstance.get('/geo/province')
            return data
        }
    })
}