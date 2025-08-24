import { useAxiosAuth } from "@/lib/axios" 
import { DetailPackageSchema } from "@/type/schema/PackageSchema"
import { useQuery } from "@tanstack/react-query"

export const useFetchDetailPackage = (package_id?:string)=>{
    const axiosInstance = useAxiosAuth()
 return useQuery<DetailPackageSchema[]>(
        {
            queryKey:['detailPackage'],
            queryFn: async()=>{
                const { data } = await axiosInstance.get('/detail-package',{
                    params:{package_id}
                })
                return data
            }
        })
}   