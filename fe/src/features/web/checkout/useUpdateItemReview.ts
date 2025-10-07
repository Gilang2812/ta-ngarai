import { useAxiosAuth } from "@/lib/axios";
import { ActionProps } from "@/types/props/ActionProps";
import { onError } from "@/utils/ErrorHandler";
import { useMutation } from "@tanstack/react-query";

export const useUpdateItemReview = ({ onSuccess }: ActionProps) => {
  const axiosInstance = useAxiosAuth()
 return useMutation({
    mutationFn: async (body: FormData) => {
      const { data } = await axiosInstance.patch(
        `/checkouts/${body.get("checkout_id")}/${body.get(
          "craft_variant_id"
        )}/${body.get("id_souvenir_place")}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onSuccess,
    onError,
  });
};
