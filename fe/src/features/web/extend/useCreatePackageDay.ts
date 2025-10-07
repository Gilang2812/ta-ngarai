import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { PackageDayFormSchema } from "@/types/schema/PackageSchema";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";


export const useCreatePackageDay = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: PackageDayFormSchema) => {
      const { data } = await axiosInstance.post("/packages/day/create", body);
      return data;
    },
    onSuccess,
    onError
  });
};
