import { useAxiosAuth } from "@/lib/axios"
import { ActionProps } from "@/types/props/ActionProps"
import { AnnouncementSchema } from "@/types/schema/AnnouncementSchema"
import { onError } from "@/utils/ErrorHandler"
import { useMutation } from "@tanstack/react-query"

export const useEditAnnouncement = ({onSuccess}:ActionProps)=>{
    const axiosInstance = useAxiosAuth()
 return useMutation({
        mutationFn: async ( body:AnnouncementSchema) => {
            const { data } = await axiosInstance.patch(`/announcement/${body.id}`, body)
            return data
        },
        onSuccess, 
        onError
    })
}