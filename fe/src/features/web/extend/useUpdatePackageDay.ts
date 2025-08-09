import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { PackageDayFormSchema } from "@/type/schema/PackageSchema";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePackageDay = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async ({ day, package_id, ...rest }: PackageDayFormSchema) => {
      const { data } = await axiosInstance.patch(
        `/packages/day/${day}/${package_id}`,
        {
          day,
          package_id,
          ...rest,
        }
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
