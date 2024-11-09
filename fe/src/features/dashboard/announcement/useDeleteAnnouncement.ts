import { axiosInstance } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { useMutation } from "@tanstack/react-query"

export const useDeleteAnnouncement = ({onSuccess, onError}:ActionProps) => {
    return useMutation({
        mutationFn: async (announcementId: string) => {
           const {data} =  await axiosInstance.delete(`/announcement/${announcementId}`)
          return data
        },
        onSuccess,
        onError 
    })
}