import { axiosInstance } from "@/lib/axios"
import { HomestayFacilityDetailSchema } from "@/type/schema/FacilitySchema"
import { useQuery } from "@tanstack/react-query"

export const useFetchDetailHomestayFacilities = ()=>{
    return useQuery<HomestayFacilityDetailSchema>({
        queryKey:['homestayFacilities'],     
        queryFn: async ()=>{
            const {data} = await axiosInstance.get(`/homestay-facility/details`)
            return data
        }
    })
}