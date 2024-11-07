import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchTourism = (id:string)=>{
    return useQuery({
        queryKey:['tourism_info'],
        queryFn:async ()=>{
            const {data} = await axiosInstance.get(`/tourism/${id}`)
            return data
        }
    })
}