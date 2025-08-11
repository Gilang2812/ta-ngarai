import { axiosInstance } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { AnnouncementSchema } from "@/type/schema/AnnouncementSchema"
import { onError } from "@/utils/ErrorHandler"
import { useMutation } from "@tanstack/react-query"

export const useEditAnnouncement = ({onSuccess}:ActionProps)=>{
    return useMutation({
        mutationFn: async ( body:AnnouncementSchema) => {
            const {data } = await axiosInstance.patch(`/announcement/${body.id}`, body)
            return data
        },
        onSuccess, 
        onError
    })
}