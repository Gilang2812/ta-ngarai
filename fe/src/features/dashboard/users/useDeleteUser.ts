import { axiosInstance } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { useMutation } from "@tanstack/react-query"

export const useDeleteUser = ({onSuccess,onError}:ActionProps)=>{
    return useMutation({
        mutationFn: async ({userId,groupId}:{userId:string,groupId:string}) => {
            await axiosInstance.delete(`/users/${userId}/${groupId}`)
            onSuccess()
        },
        onError
    })
}