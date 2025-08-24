import { useAxiosAuth } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchUsers = ()=>{
    const axiosInstance = useAxiosAuth()
 return useQuery({
        queryKey:['users'],
        queryFn: async ()=>{
            const { data } = await axiosInstance.get('/users')
            return data
        },
        
    })
}