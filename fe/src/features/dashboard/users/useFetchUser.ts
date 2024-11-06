import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchUsers = ()=>{
    return useQuery({
        queryKey:['users'],
        queryFn: async ()=>{
            const {data} = await axiosInstance.get('/users')
            return data
        },
        
    })
}