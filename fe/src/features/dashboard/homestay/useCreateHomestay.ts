import { axiosInstance } from '@/lib/axios';
import { ActionProps } from '@/type/props/ActionProps';
import { CreateHomestaySchema } from '@/validation/homestaySchema';
import { useMutation } from '@tanstack/react-query';
export const useCreateHomestay = ({onSuccess, onError}:ActionProps)=>{
    return useMutation({
        mutationFn:async (body:CreateHomestaySchema)=>{
            const {data} =await axiosInstance.post('/homestays',body)
            return data
        },
        onSuccess,
        onError
    })
}