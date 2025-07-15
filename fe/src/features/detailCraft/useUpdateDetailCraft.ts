import { axiosInstance } from "@/lib/axios";
import { ActionProps } from "@/type/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateDetailCraft = ({ onSuccess }: ActionProps) => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const { data: FormData } = await axiosInstance.patch(
        `/detail-crafts/${data.get("craft_variant_id")}/${data.get(
          "id_souvenir_place"
        )}`,
        data
      );
      return FormData;
    },
    onSuccess,
    onError,
  });
};
