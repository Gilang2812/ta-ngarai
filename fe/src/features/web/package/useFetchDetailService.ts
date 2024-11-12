import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"


export const useFetchDetailService =<T>(id:string)=>{
    return useQuery<T[]>({
        queryKey:['service_package_detail', id],
        queryFn: async ()=>{
            const {data} = await axiosInstance.get(`/services`,{params:{package_id:id}})
            return data
        }
    })

}