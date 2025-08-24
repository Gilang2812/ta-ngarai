import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { HomestayReviewFormSchema } from "@/type/schema/ReservationSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateDetailReservation = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: HomestayReviewFormSchema) => {
      const {
        date,
        reservation_id,
        homestay_id,
        unit_type,
        unit_number,
        ...rest
      } = body;
      const { data } = await axiosInstance.patch(
        `/detail-reservations/${date}/${reservation_id}/${homestay_id}/${unit_type}/${unit_number}`,
        rest
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
