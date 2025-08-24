import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateDetailCraft = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (data: FormData) => {
      const { data: FormData } = await axiosInstance.patch(
        `/detail-crafts/${data.get("id_souvenir_place")}/${data.get(
          "craft_variant_id"
        )}`,
        data
      );
      return FormData;
    },
    onSuccess,
    onError,
  });
};
