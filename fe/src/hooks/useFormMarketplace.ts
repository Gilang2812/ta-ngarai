import { ROUTES } from "@/data/routes";
import { useCreateMarketplace } from "@/features/dashboard/marketplace/useCreateMarketplace";
import { useUpdateMarketplace } from "@/features/dashboard/marketplace/useUpdateMarketplace";
import { LatLngType } from "@/type/props/mapProps";
import { FormMarketplace } from "@/type/schema/MarketplaceSchema";
import { cornerAlert } from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { useRouter } from "next/navigation";
import { useState } from "react";
const useFormMarketplace = (existingMarketplace?: FormMarketplace) => {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<
    FormMarketplace & LatLngType
  >({
    id: existingMarketplace?.id || "",
    name: existingMarketplace?.name || "",
    address: existingMarketplace?.address || "",
    contact_person: existingMarketplace?.contact_person || "",
    close: existingMarketplace?.close || "",
    open: existingMarketplace?.open || "",
    description: existingMarketplace?.description || "",
    geom: existingMarketplace?.geom || "",
    images: existingMarketplace?.images || [],
    latitude: 0,
    longitude: 0,
  });
  const { mutate: createMarketplace, isPending: isPendingCreate } =
    useCreateMarketplace({
      onSuccess: () => {
        cornerAlert("success create marketplace");
        router.push(ROUTES.MARKETPLACE);
      },
    });
  const { mutate: updateMarketplace, isPending: isPendingUpdate } =
    useUpdateMarketplace({
      onSuccess: () => {
        cornerAlert("success update marketplace");
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
