import { useCreateMarketplace } from "@/features/dashboard/marketplace/useCreateMarketplace";
import { useUpdateMarketplace } from "@/features/dashboard/marketplace/useUpdateMarketplace";
import { useAuthStore } from "@/stores/AuthStore";
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
  const { updateUser } = useAuthStore();
  const { mutate: createMarketplace, isPending: isPendingCreate } =
    useCreateMarketplace({
      onSuccess: (data) => {
        cornerAlert("success create umkm");
        console.log("Marketplace created:", data);
        updateUser({
          id_souvenir_place: (data as { id: string }).id,
        });

        onSuccessForm?.();
      },
    });
  const { mutate: updateMarketplace, isPending: isPendingUpdate } =
    useUpdateMarketplace({
      onSuccess: () => {
        cornerAlert("success update umkm");
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
