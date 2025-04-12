import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchCountry = ()=>{
    return useQuery({
        queryKey:['country'],
        queryFn:async()=>{
            const {data} = await axiosInstance.get('/geo/country')
            return data
        }
    })
}