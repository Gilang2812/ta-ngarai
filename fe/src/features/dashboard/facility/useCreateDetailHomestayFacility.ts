import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { CustomError } from "@/type/props/ErrorProps";
import { showErrorAlert } from "@/utils/AlertUtils";
import { CreateDetailFacilityHomestaySchema } from "@/validation/facilitySchema";
import { useMutation } from "@tanstack/react-query";

export const useCreateDetailHomestayFacility = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: CreateDetailFacilityHomestaySchema) => {
      const { data } = await axiosInstance.post("/homestay-facility/details", body);
      return data;
    },
    onSuccess,
    onError: (e:CustomError) => {
      showErrorAlert(e)
    }
  });
};
