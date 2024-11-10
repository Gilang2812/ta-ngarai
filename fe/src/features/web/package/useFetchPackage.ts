import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchPackages = ()=>{
    return useQuery({
        queryKey:['package'],
        queryFn: async ()=>{
            const {data} = await axiosInstance.get('/package')
            return data
        },
        
    })
}