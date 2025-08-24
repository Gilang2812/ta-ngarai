import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { PackageTypeFormSchema } from "@/type/schema/PackageSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePackageTypes = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async ({ id, type_name }: PackageTypeFormSchema) => {
      const { data } = await axiosInstance.patch(`/packages/types/${id}`, {
        id,
        type_name,
      });
      return data;
    },
    onSuccess,
    onError,
  });
};
