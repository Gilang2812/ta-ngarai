import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";
import { PackageTypeFormSchema } from "@/types/schema/PackageSchema";

export const useCreatePackageType = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: PackageTypeFormSchema) => {
      const { data } = await axiosInstance.post("/packages/types/create", body);
      return data;
    },
    onSuccess,
    onError,
  });
};
