import { onError } from './../../utils/ErrorHandler';
 
import { FormReservationSchema } from "@/app/(user)/web/reservation/custombooking/[id]/page"
import { axiosInstance } from "@/lib/axios"
import { ActionProps } from '@/type/props/ActionProps';
import { useMutation } from "@tanstack/react-query"

export const useCreateReservation = ({onSuccess}:ActionProps)=>{
    return useMutation({
        mutationFn: async (body: FormReservationSchema) => {
            const {data} = await axiosInstance.post('/reservations/create', body)
            return data
        },
        onSuccess,
        onError
    })
}