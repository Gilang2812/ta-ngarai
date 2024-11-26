import { axiosInstance } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { CustomError } from "@/type/props/ErrorProps"
import { showErrorAlert } from "@/utils/AlertUtils"
import { CreateFacilityHomestaySchema } from "@/validation/facilitySchema"
import { useMutation } from "@tanstack/react-query"

export const useCreateHomestayFacility = ({onSuccess}:ActionProps) => {
    return useMutation({
        mutationFn: async (body:CreateFacilityHomestaySchema) => {
            await axiosInstance.post(`/homestay-facility`,body)
        },
        onSuccess,
        onError :(e:CustomError)=>{
            showErrorAlert(e)
        }
    })
}