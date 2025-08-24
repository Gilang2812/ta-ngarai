 
import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler"; 
import { CreateFacilityFormSchema } from "@/validation/homestaySchema";
import { useMutation } from "@tanstack/react-query";
export const useCreateFacilityUnit = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: CreateFacilityFormSchema) => {
      const { data } = await axiosInstance.post("/homestays/units/facility", body);
      return data;
    },
    onSuccess,
    onError,
  });
};
