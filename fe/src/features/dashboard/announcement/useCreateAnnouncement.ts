import { axiosInstance } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { AnnouncementSchema } from "@/type/schema/AnnouncementSchema"
import { useMutation } from "@tanstack/react-query"

export const useCreateAnnouncement = ({onSuccess,onError} : ActionProps) => {
    return useMutation({
        mutationFn :async (body:AnnouncementSchema)=>{
            const {data} = await axiosInstance.post('/announcement',body)
            return data
        },
        onSuccess,
        onError
    })
}