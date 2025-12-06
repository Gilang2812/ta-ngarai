import { ROUTES } from "@/data/routes";
import { useCreateMarketplace } from "@/features/dashboard/marketplace/useCreateMarketplace";
import { useUpdateMarketplace } from "@/features/dashboard/marketplace/useUpdateMarketplace";
import { LatLngType } from "@/types/props/mapProps";
import { FormMarketplace } from "@/types/schema/MarketplaceSchema";
import { cornerAlert } from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
const useFormMarketplace = (
  existingMarketplace?: FormMarketplace,
  callback?: () => void
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<
    FormMarketplace & LatLngType
  >({
    id: existingMarketplace?.id || "",
    name: existingMarketplace?.name || "",
    village: existingMarketplace?.village || "",
    contact_person: existingMarketplace?.contact_person || "",
    close: existingMarketplace?.close || "",
    open: existingMarketplace?.open || "",
    description: existingMarketplace?.description || "",
    geom: existingMarketplace?.geom || "",
    images: existingMarketplace?.images || [],
    postal_code: existingMarketplace?.postal_code || "",
    latitude: 0,
    longitude: 0,
    destination_id: existingMarketplace?.destination_id || "",
    district: existingMarketplace?.district.toLocaleLowerCase() || "",
    regency: existingMarketplace?.regency?.toLocaleLowerCase() || "",
    country: existingMarketplace?.country.toLocaleLowerCase() || "",
    province: existingMarketplace?.province.toLocaleLowerCase() || "",
    street: existingMarketplace?.street || "",
  });

  const { mutate: createMarketplace, isPending: isPendingCreate } =
    useCreateMarketplace({
      onSuccess: () => {
        cornerAlert("success create marketplace");
        callback?.();
        queryClient.invalidateQueries({ queryKey: ["sp-user"] });

        router.push(ROUTES.MARKETPLACE);
      },
    });
  const { mutate: updateMarketplace, isPending: isPendingUpdate } =
    useUpdateMarketplace({
      onSuccess: () => {
        cornerAlert("success update marketplace");
        callback?.();
        queryClient.invalidateQueries({ queryKey: ["sp-user"] });
        router.push(ROUTES.MARKETPLACE);
      },
    });

  const handleSubmit = (values: FormMarketplace) => {
    const formData = createFormData(values);
    if (initialValues.id) {
      updateMarketplace(formData);
    } else {
      createMarketplace(formData);
    }
  };
  return {
    initialValues,
    setInitialValues,
    isPending: isPendingCreate || isPendingUpdate,
    handleSubmit,
  };
};

export default useFormMarketplace;
