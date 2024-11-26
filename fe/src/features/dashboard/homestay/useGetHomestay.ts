 
import { axiosInstance } from "@/lib/axios" 
import { HomestayFacilityDetailSchema } from "@/type/schema/FacilitySchema"
import { GalleryHomestaySchema } from "@/type/schema/GalleryHomestaySchema"
import { HomestaySchema } from "@/type/schema/HomestaySchema"
import { useQuery } from "@tanstack/react-query"

 export type FetchHomestayProps = HomestaySchema &{details:HomestayFacilityDetailSchema[]; galleries:GalleryHomestaySchema[]}
export const useGetHomestay = (id:string)=>{
    return useQuery<FetchHomestayProps>({
        queryKey: ['homestay'],
        queryFn: async ()=>{
            const {data} = await axiosInstance.get(`/homestays/${id}`)
            return data
        },
    })
}