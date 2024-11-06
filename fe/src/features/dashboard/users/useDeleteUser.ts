import { axiosInstance } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { useMutation } from "@tanstack/react-query"

export const useDeleteUser = ({onSuccess,onError}:ActionProps)=>{
    return useMutation({
        mutationFn: async (id: string) => {
            await axiosInstance.delete(`/users/${id}`)
            onSuccess()
        },
        onError
    })
}