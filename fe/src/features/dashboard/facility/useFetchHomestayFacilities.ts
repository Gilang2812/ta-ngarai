import { axiosInstance } from "@/lib/axios"
import { HomestayFacilitySchema } from "@/type/schema/FacilitySchema"
import { useQuery } from "@tanstack/react-query"

export const useFetchHomestayFacilities = ()=>{
    return useQuery<HomestayFacilitySchema[]>({
        queryKey:['facilities'],     
        queryFn:async ()=>{
            const {data} = await axiosInstance.get('/homestay-facility')
            return data
        }
    })
}