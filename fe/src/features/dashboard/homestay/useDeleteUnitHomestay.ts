import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUnitHomestay = ({ onSuccess, onError }: ActionProps) => {
  return useMutation({
    mutationFn: async ({
      homestay_id,
      unit_type,
      unit_number,
    }: {
      homestay_id: string;
      unit_type: string;
      unit_number: string;
    }) => {
      const { data } = await axiosInstance.delete(
        `/homestays/units/${homestay_id}/${unit_type}/${unit_number}`
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
