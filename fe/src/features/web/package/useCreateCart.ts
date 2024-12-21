import { axiosInstance } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { CartSchema } from "@/type/schema/CartSchema"
import { onError } from "@/utils/ErrorHandler"
import { useMutation } from "@tanstack/react-query"

 
export const useCreateCart = ({onSuccess}:ActionProps)=>{
    return useMutation({
        mutationFn: async (body: CartSchema) => {
            const {data} = await axiosInstance.post('/carts', body)
            return data
        },
        onSuccess ,
        onError 
    })
}