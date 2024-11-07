import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchAnnouncements = ()=>{
    return useQuery({
        queryKey: ['announcements'],
        queryFn:async ()=>{
                const {data} = await axiosInstance.get('/announcement')

                return data
        }
    })
}