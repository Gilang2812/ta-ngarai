import { useAxiosAuth } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { onError } from "@/utils/ErrorHandler"
import { CreateFacilityHomestaySchema } from "@/validation/facilitySchema"
import { useMutation } from "@tanstack/react-query"

export const useCreateHomestayFacility = ({onSuccess}:ActionProps) => {
    const axiosInstance = useAxiosAuth()
 return useMutation({
        mutationFn: async (body:CreateFacilityHomestaySchema) => {
            await axiosInstance.post(`/homestay-facility`,body)
        },
        onSuccess,
        onError 
    })
}