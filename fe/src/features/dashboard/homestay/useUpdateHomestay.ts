import { axiosInstance } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { CustomError } from "@/type/props/ErrorProps"
import { showErrorAlert } from "@/utils/AlertUtils"
import { CreateHomestaySchema } from "@/validation/homestaySchema"
import { useMutation } from "@tanstack/react-query"

export const useUpdateHomestay = ( {onSuccess}:ActionProps)=>{
    return useMutation({
        mutationFn: async (body:CreateHomestaySchema)=>{
            const {data} = await axiosInstance.patch(`/homestays/${body.id}`,body)
            return data
        },
        onSuccess,
        onError: (error:CustomError) => {
            showErrorAlert(error);
          },
    })
}