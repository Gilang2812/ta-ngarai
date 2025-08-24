import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

 
export const useDeleteCart = ({onSuccess}:ActionProps )=>{
    const axiosInstance = useAxiosAuth()
 return useMutation({
        mutationFn: async (id:string)=>{
            const { data } = await axiosInstance.delete(`/carts/${id}`)
            return data
        },
        onSuccess ,
        onError
    })
}