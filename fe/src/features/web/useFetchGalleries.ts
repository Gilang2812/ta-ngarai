import { axiosInstance } from "@/lib/axios"
import { GalleryPackageSchema } from "@/type/schema/gallerySchema"
import { useQuery } from "@tanstack/react-query"

export const useFetchGalleries = (object :string, custom?:number|string)=>{
    return useQuery<GalleryPackageSchema[]>({
        queryKey: ['tourism_galleries'],
        queryFn: async ()=>{
            const {data} = await axiosInstance.get(`/gallery/${object}?custom=${custom}`)
            return data
        }
    })

}