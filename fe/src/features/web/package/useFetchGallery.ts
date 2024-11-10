import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchGalleries = (custom:string|number) => {
    return useQuery({
        queryKey: ['tourism_galleries'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/gallery/package?custom='+ custom)
            return data
        }
    })
}