import { axiosInstance } from "@/lib/axios"
import { ActionProps } from "@/type/props/ActionProps"
import { CustomError } from "@/type/props/ErrorProps"
import { showErrorAlert } from "@/utils/AlertUtils"
import { DeleteDetailFacilitySchema } from "@/validation/facilitySchema"
import { useMutation } from "@tanstack/react-query"

export const useDeleteDetailHomestayFacility = ({onSuccess}:ActionProps)=>{
    return useMutation({
        mutationFn:async (body:DeleteDetailFacilitySchema)=>{
            const {data} = await axiosInstance.delete(`/homestay-facility/${body.homestay_id}/${body.facility_homestay_id}`)
        },
        onSuccess,
        onError: (error: CustomError) => {
            showErrorAlert(error)
        }
    })
}