import { axiosInstance } from "@/lib/axios"
import { DetailPackage } from "@/type/schema/detailPackage"
import { useQuery } from "@tanstack/react-query"

export const useFetchDetailPackage = ()=>{
    return useQuery<DetailPackage[]>(
        {
            queryKey:['detailPackage'],
            queryFn: async()=>{
                const {data} = await axiosInstance.get('/detailPackage')
                return data
            }
        })
}   