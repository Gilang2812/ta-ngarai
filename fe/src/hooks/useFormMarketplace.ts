import { useCreateMarketplace } from "@/features/dashboard/marketplace/useCreateMarketplace";
import { useUpdateMarketplace } from "@/features/dashboard/marketplace/useUpdateMarketplace";
import { FormMarketplace } from "@/type/schema/MarketplaceSchema";
import { cornerAlert } from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { useState } from "react";
const useFormMarketplace = (
  existingMarketplace?: FormMarketplace,
  onSuccessUpdate?: () => void
) => {
  const [initialValues, setInitialValues] = useState<FormMarketplace>({
    id: existingMarketplace?.id || "",
    name: existingMarketplace?.name || "",
    address: existingMarketplace?.address || "",
    contact_person: existingMarketplace?.contact_person || "",
    close: existingMarketplace?.close || "",
    open: existingMarketplace?.open || "",
    description: existingMarketplace?.description || "",
    geom: existingMarketplace?.geom || "",
    images: existingMarketplace?.images || [],
  });
  const { mutate: createMarketplace, isPending: isPendingCreate } =
    useCreateMarketplace({
      onSuccess: () => {
        cornerAlert("success create marketplace");
      },
    });
  const { mutate: updateMarketplace, isPending: isPendingUpdate } =
    useUpdateMarketplace({
      onSuccess: () => {
        cornerAlert("success update marketplace");
        onSuccessUpdate?.();
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
