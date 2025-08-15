 
import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler"; 
import { CreateFacilityUnitFormSchema } from "@/validation/homestaySchema";
import { useMutation } from "@tanstack/react-query";
export const useCreateFacilityUnitDetail = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: CreateFacilityUnitFormSchema) => {
      const { data } = await axiosInstance.post("/homestays/units/detail", body);
      return data;
    },
    onSuccess,
    onError,
  });
};
