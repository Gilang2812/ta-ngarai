import { axiosInstance } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { TourismSchema } from "@/type/schema/tourismSchema"
import { useMutation } from "@tanstack/react-query"

export const useEditTourism= ({onSuccess,onError}:ActionProps)=>{
    return useMutation({
        mutationFn: async (body:TourismSchema) => {
            await axiosInstance.patch(`/tourism/${body.id}`, body)
        },
        onSuccess,
        onError
    })
}