import { useAxiosAuth } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { CreateUserSchema } from "@/validation/usersSchema"
import { useMutation } from "@tanstack/react-query"

export const useCreateUser= ({onSuccess,onError}:ActionProps)=>{
    const axiosInstance = useAxiosAuth()
 return useMutation({
        mutationFn: async (body: CreateUserSchema) => {
            const { data } = await axiosInstance.post('/users', body)
            return data
        },
        onSuccess,
        onError
    })
}