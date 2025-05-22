import { useCreateCraft } from "@/features/dashboard/craft/useCreateCraft";
import { useFetchCraft } from "@/features/dashboard/craft/useFetchCraft";
import { useCreateCraftVariant } from "@/features/dashboard/craftVariant/useCreateCraftVariant";
import { useDeleteCraftVariant } from "@/features/dashboard/craftVariant/useDeleteCraftVariant";
import { useFetchCraftVariant } from "@/features/dashboard/craftVariant/useFetchCraftVariant";
import { type CraftVariant, type Craft } from "@/type/schema/CraftSchema";
import { confirmDeleteAlert, cornerAlert } from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { useModal } from "@/utils/ModalUtils";
import { useCallback, useMemo, useState } from "react";

export const useCraftManagement = () => {
  const [isFormCraft, setFormType] = useState<boolean>(true);
  const { isOpen, toggleModal } = useModal();
  const getDefaultCraft = (): Craft => ({
    id: "",
    name: "",
  });
  const {
    data: crafts,
    isLoading: craftsLoading,
    refetch: refetchCrafts,
  } = useFetchCraft();
  const {
    data: variants,
    isLoading: variantsLoading,
    refetch: refetchVariants,
  } = useFetchCraftVariant();

  const getDefaultVariant = (): CraftVariant => ({
    id: "",
    id_craft: "",
    name: "",
    price: "" as unknown as number,
    modal: "" as unknown as number,
    stock: "" as unknown as number,
    description: "",
    images: [],
  });

  const { mutate: createCraft, isPending: craftPending } = useCreateCraft({
    onSuccess: () => {
      toggleModal();
      cornerAlert("kerajinan berhasil ditambahkan");
      refetchCrafts();
    },
  });
  const { mutate: createVariant, isPending: variantPending } =
    useCreateCraftVariant({
      onSuccess: () => {
        toggleModal();
        cornerAlert("variasi kerajinan  berhasil ditambahkan");
        refetchVariants();
      },
    });
  const { mutateAsync: deleteVariant } = useDeleteCraftVariant({
    onSuccess: () => {
      cornerAlert("variasi kerajinan  berhasil dihapus");
      refetchVariants();
    },
  });

  const isLoading = craftsLoading || variantsLoading;
  const isPending = craftPending || variantPending;

  const initialValues: Craft | CraftVariant = useMemo(() => {
    return isFormCraft ? getDefaultCraft() : getDefaultVariant();
  }, [isFormCraft]);

  const handleCraftForm = useCallback(() => {
    toggleModal();
    setFormType(true);
  }, [toggleModal]);
  const handleVariantForm = useCallback(() => {
    toggleModal();
    setFormType(false);
  }, [toggleModal]);

  const handleDeleteVariant = async (variantId: string, name: string) => {
    confirmDeleteAlert("Kerajinan", name, async () => {
      await deleteVariant(variantId);
    });
  };

  const handleSubmit = (values: CraftVariant | Craft) => {
    const variantValues = values as CraftVariant;
    console.log(values);
    if (!isFormCraft) {
      const formData = createFormData<CraftVariant>(variantValues);
      console.log(formData);
      return createVariant(formData);
    }

    return createCraft(values);
  };
  return {
    isOpen,
    handleCraftForm,
    handleVariantForm,
    isFormCraft,
    initialValues: initialValues as Craft | CraftVariant,
    handleSubmit,
    isPending,
    crafts,
    variants,
    isLoading,
    handleDeleteVariant,
  };
};
