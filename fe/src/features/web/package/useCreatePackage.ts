import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";
import { EditPackageSchema } from "@/type/schema/PackageSchema";

export const useCreatePackage = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (body: EditPackageSchema) => {
      const { data } = await axiosInstance.post("/packages/create", body);
      return data;
    },
    onSuccess,
    onError,
  });
};
