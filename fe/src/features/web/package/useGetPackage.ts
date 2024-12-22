import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { PackageService } from "./useFetchPackage"

export const useGetPackage = (id:string)=>{
    return useQuery<PackageService>({
        queryKey:['package'],
        queryFn: async ()=>{
            const {data} = await axiosInstance.get(`/packages/${id}`)
            return data
        }
    })
}