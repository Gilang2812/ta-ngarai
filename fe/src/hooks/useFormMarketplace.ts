import { useCreateMarketplace } from "@/features/dashboard/marketplace/useCreateMarketplace";
import { useUpdateMarketplace } from "@/features/dashboard/marketplace/useUpdateMarketplace";
import { FormMarketplace } from "@/type/schema/MarketplaceSchema";
import { cornerAlert } from "@/utils/AlertUtils";
import { useState } from "react";

const useFormMarketplace = ({
  onSuccessForm,
}: {
  onSuccessForm?: () => void;
} = {}) => {
  const [initialValues, setInitialValues] = useState<FormMarketplace>({
    id: "",
    name: "",
    address: "",
    contact_person: "",
    close: "",
    open: "",
    description: "",
    geom: "",
  });
  const { mutate: createMarketplace, isPending: isPendingCreate } =
    useCreateMarketplace({
      onSuccess: () => {
        cornerAlert("success create marketplace");
        onSuccessForm?.();
      },
    });
  const { mutate: updateMarketplace, isPending: isPendingUpdate } =
    useUpdateMarketplace({
      onSuccess: () => {
        cornerAlert("success update marketplace");
        onSuccessForm?.();
      },
    });

  const handleSubmit = (values: FormMarketplace) => {
    if (initialValues.id) {
      updateMarketplace(values);
    } else {
      createMarketplace(values);
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
