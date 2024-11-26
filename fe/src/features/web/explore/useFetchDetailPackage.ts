import { axiosInstance } from "@/lib/axios"
import { DetailPackage } from "@/type/schema/BetailPackage"
import { useQuery } from "@tanstack/react-query"

export const useFetchDetailPackage = (package_id?:string)=>{
    return useQuery<DetailPackage[]>(
        {
            queryKey:['detailPackage'],
            queryFn: async()=>{
                const {data} = await axiosInstance.get('/detailPackage',{
                    params:{package_id}
                })
                return data
            }
        })
}   