import { useAxiosAuth } from "@/lib/axios"
import { HomestayFacilitySchema } from "@/types/schema/FacilitySchema"
import { useQuery } from "@tanstack/react-query"

export const useFetchHomestayFacilities = ()=>{
    const axiosInstance = useAxiosAuth()
 return useQuery<HomestayFacilitySchema[]>({
        queryKey:['facilities'],     
        queryFn:async ()=>{
            const { data } = await axiosInstance.get('/homestay-facility')
            return data
        }
    })
}