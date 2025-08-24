import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { useMutation } from "@tanstack/react-query";
import { onError } from "@/utils/ErrorHandler";

export const useCreateModifyPackage = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async ({
      id,
      isCustom = false,
      isNew = false,
    }: {
      id: string;
      isCustom?: boolean;
      isNew?: boolean;
    }) => {
      const { data } = await axiosInstance.post(
        `/packages/modify/${id}?isCustom=${isCustom}&isNew=${isNew}`,
        {}
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
