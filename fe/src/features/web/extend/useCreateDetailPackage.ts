import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { PackageActivityFormSchema } from "@/type/schema/PackageSchema";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";

export const useCreateDetailPackage = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth();
  return useMutation({
    mutationFn: async (body: PackageActivityFormSchema) => {
      const { data } = await axiosInstance.post(
        "/packages/detail/create",
        body
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
