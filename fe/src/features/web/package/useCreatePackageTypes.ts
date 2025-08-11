import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";
import { PackageTypeFormSchema } from "@/type/schema/PackageSchema";

export const useCreatePackageType = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: PackageTypeFormSchema) => {
      const { data } = await axiosInstance.post("/packages/types/create", body);
      return data;
    },
    onSuccess,
    onError,
  });
};
