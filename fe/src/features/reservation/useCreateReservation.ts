import { onError } from "./../../utils/ErrorHandler";

import { FormReservationSchema } from "@/app/(user)/web/(auth)/reservation/custombooking/[id]/page";
import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { AllUnitHomestayResponseSchema } from "@/type/schema/HomestaySchema";
import { HomestayReservationFormSchemaType } from "@/type/schema/ReservationSchema";
import { useMutation } from "@tanstack/react-query";

export const useCreateReservation = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (
      body:
        | FormReservationSchema
        | (HomestayReservationFormSchemaType & {
            selectedUnits: AllUnitHomestayResponseSchema[];
          })
    ) => {
      const { data } = await axiosInstance.post("/reservations/create", body);
      return data;
    },
    onSuccess,
    onError,
  });
};
