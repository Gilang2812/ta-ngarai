import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchGalleries = (object :string)=>{
    return useQuery({
        queryKey: ['tourism_galleries'],
        queryFn: async ()=>{
            const {data} = await axiosInstance.get('/gallery/'+object)
            return data
        }
    })

}