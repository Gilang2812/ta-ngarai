import { axiosInstance } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { RegisterSchema } from "@/validation/authSchema"
import { useMutation } from "@tanstack/react-query"

export const useRegister = ({onSuccess,onError}:ActionProps)=>{
    return useMutation({
        mutationFn:async(body:RegisterSchema)=>{
            const {data } = await axiosInstance.post('/register',body)
            return data
        },
        onSuccess,
        onError
    })
}