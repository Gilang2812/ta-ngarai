import { type CraftVariantWithGalleriesSchema } from "./../type/schema/CraftSchema";

import { useCreateCraft } from "@/features/dashboard/craft/useCreateCraft";
import { useDeleteCraft } from "@/features/dashboard/craft/useDeleteCraft";
import { useFetchCraft } from "@/features/dashboard/craft/useFetchCraft";
import { useUpdateCraft } from "@/features/dashboard/craft/useUpdateCraft";
import { useCreateCraftVariant } from "@/features/dashboard/craftVariant/useCreateCraftVariant";
import { useDeleteCraftVariant } from "@/features/dashboard/craftVariant/useDeleteCraftVariant";
import { useFetchCraftVariant } from "@/features/dashboard/craftVariant/useFetchCraftVariant";
import { type CraftVariant, type Craft } from "@/type/schema/CraftSchema";
import { confirmDeleteAlert, cornerAlert } from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { useModal } from "@/utils/ModalUtils";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useCraftManagement = () => {
  const [isFormCraft, setFormType] = useState<boolean>(true);
  const [isEditCraft, setEditCraft] = useState<string | null>(null);
  const { isOpen: isOpenForm, toggleModal: toggleForm } = useModal();
  const { isOpen: isOpenList, toggleModal: toggleList } = useModal();
  const [selectedVariant, setSelectedVariant] =
    useState<CraftVariantWithGalleriesSchema | null>(null);
  const [selectedImg, setSelectedImg] = useState<string>(
    selectedVariant?.craftGalleries?.[0].url ?? ""
  );
  useEffect(() => {
    if (selectedVariant?.craftGalleries?.[0]?.url) {
      setSelectedImg(selectedVariant.craftGalleries[0].url);
    }
  }, [selectedVariant]);
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
  } = useFetchCraftVariant<CraftVariantWithGalleriesSchema>([
    "craft",
    "craftGalleries",
  ]);

  const getDefaultVariant = (): CraftVariant => ({
    id: "",
    id_craft: "",
    name: "",
    price: "" as unknown as number,
    weight: "" as unknown as number,
    modal: "" as unknown as number,
    stock: "" as unknown as number,
    description: "",
    images: [],
  });
  const toggleEditCraft = useCallback((id: string | null) => {
    setEditCraft((prev) => {
      if (id === prev) {
        return null;
      } else {
        return id;
      }
    });
  }, []);
  const { mutate: createCraft, isPending: craftPending } = useCreateCraft({
    onSuccess: () => {
      toggleForm();
      cornerAlert("kerajinan berhasil ditambahkan");
      refetchCrafts();
    },
  });
  const { mutate: createVariant, isPending: variantPending } =
    useCreateCraftVariant({
      onSuccess: () => {
        toggleForm();
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
  const { mutate: updateCraft, isPending: updateCraftPending } = useUpdateCraft(
    {
      onSuccess: async () => {
        toggleEditCraft(null);
        cornerAlert(" kerajinan  berhasil di edit");

        refetchCrafts();
        refetchVariants();
      },
    }
  );
  const { mutateAsync: deleteCraft } = useDeleteCraft({
    onSuccess: () => {
      cornerAlert("variasi kerajinan  berhasil dihapus");
      refetchCrafts();
      refetchVariants();
    },
  });

  const isLoading = craftsLoading || variantsLoading;
  const isPending = craftPending || variantPending;

  const initialValues: Craft | CraftVariant = useMemo(() => {
    return isFormCraft ? getDefaultCraft() : getDefaultVariant();
  }, [isFormCraft]);

  const handleCraftForm = useCallback(() => {
    toggleForm();
    setFormType(true);
  }, [toggleForm]);
  const handleVariantForm = useCallback(() => {
    toggleForm();
    setFormType(false);
  }, [toggleForm]);

  const handleDeleteVariant = async (variantId: string, name: string) => {
    confirmDeleteAlert("Kerajinan", name, async () => {
      await deleteVariant(variantId);
    });
  };
  const handleDeleteCraft = async (craftId: string, name: string) => {
    confirmDeleteAlert("Kerajinan", name, async () => {
      await deleteCraft(craftId);
    });
  };
  const handleEditCraft = async (values: {
    id: string;
    craft_name: string;
  }) => {
    const currentCraft = crafts?.find((cr) => cr.id === values.id);
    if (currentCraft?.name === values.craft_name) {
      return cornerAlert("nothing change");
    }
    updateCraft({ id: values.id, name: values.craft_name });
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
    isOpenForm,
    isOpenList,
    toggleList,
    handleVariantForm,
    isFormCraft,
    initialValues: initialValues as Craft | CraftVariant,
    handleSubmit,
    isPending,
    crafts,
    handleCraftForm,
    variants,
    isLoading,
    handleDeleteVariant,
    handleEditCraft,
    updateCraftPending,
    isEditCraft,
    toggleEditCraft,
    handleDeleteCraft,
    selectedVariant,
    setSelectedVariant,
    selectedImg,
    setSelectedImg,
  };
};
