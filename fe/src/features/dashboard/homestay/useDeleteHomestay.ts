import { axiosInstance } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { useMutation } from "@tanstack/react-query"

export const useDeleteHomestay = ({onSuccess,onError}:ActionProps)=>{
    return useMutation({
        mutationFn: async (id:string)=>{
            const {data} = await axiosInstance.delete(`/homestays/${id}`)
            return data
        },
        onSuccess,
        onError
    })
}