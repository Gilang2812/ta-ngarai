import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps"; 
import { onError } from "@/utils/ErrorHandler";
import { CreateDetailFacilityHomestaySchema } from "@/validation/facilitySchema";
import { useMutation } from "@tanstack/react-query";

export const useCreateDetailHomestayFacility = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: CreateDetailFacilityHomestaySchema) => {
      const { data } = await axiosInstance.post(
        "/homestay-facility/details",
        body
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
