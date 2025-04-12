import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchVillage = ()=>{
    return useQuery({
        queryKey:['village'],
        queryFn:async()=>{
            const {data} = await axiosInstance.get('/geo/village')
            return data
        }
    })
}