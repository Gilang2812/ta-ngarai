import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { PackageActivityFormSchema } from "@/types/schema/PackageSchema";
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
