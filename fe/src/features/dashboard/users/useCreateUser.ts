import { axiosInstance } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { CreateUserSchema } from "@/validation/usersSchema"
import { useMutation } from "@tanstack/react-query"

export const useCreateUser= ({onSuccess,onError}:ActionProps)=>{
    return useMutation({
        mutationFn: async (body: CreateUserSchema) => {
            const {data } = await axiosInstance.post('/users', body)
            return data
        },
        onSuccess,
        onError
    })
}