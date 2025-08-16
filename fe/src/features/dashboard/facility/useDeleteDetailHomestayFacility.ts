import { axiosInstance } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { onError } from "@/utils/ErrorHandler"
import { DeleteDetailFacilitySchema } from "@/validation/facilitySchema"
import { useMutation } from "@tanstack/react-query"

export const useDeleteDetailHomestayFacility = ({onSuccess}:ActionProps)=>{
    return useMutation({
        mutationFn:async (body:DeleteDetailFacilitySchema)=>{
            const {data} = await axiosInstance.delete(`/homestay-facility/${body.homestay_id}/${body.facility_homestay_id}`)
            return data
        },
        onSuccess,
        onError
    })
}