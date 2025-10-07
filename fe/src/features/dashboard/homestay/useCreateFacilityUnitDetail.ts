import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { CreateFacilityUnitFormSchema } from "@/validation/homestaySchema";
import { useMutation } from "@tanstack/react-query";
export const useCreateFacilityUnitDetail = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: CreateFacilityUnitFormSchema) => { 
      const unitHomestay = { ...JSON.parse(body.unitHomestay) };
      const { data } = await axiosInstance.post("/homestays/units/detail", {
        ...body,
        ...unitHomestay,
      });
      return data;
    },
    onSuccess,
    onError,
  });
};
