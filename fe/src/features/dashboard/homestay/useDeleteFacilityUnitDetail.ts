import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler"

export const useDeleteFacilityUnitHomestay = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async ({
      homestay_id,
      unit_type,
      unit_number,
      facility_unit_id
    }: {
      homestay_id: string;
      unit_type: string;
      unit_number: string;
      facility_unit_id: string;
    }) => {
      const { data } = await axiosInstance.delete(
        `/homestays/units/detail/${homestay_id}/${unit_type}/${unit_number}/${facility_unit_id}`
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
