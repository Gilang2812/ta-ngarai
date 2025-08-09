import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { PackageDayFormSchema } from "@/type/schema/PackageSchema";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";


export const useCreatePackageDay = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: PackageDayFormSchema) => {
      const { data } = await axiosInstance.post("/packages/day/create", body);
      return data;
    },
    onSuccess,
    onError
  });
};
