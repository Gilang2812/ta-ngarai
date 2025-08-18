import { useCreateCraft } from "@/features/dashboard/craft/useCreateCraft";
import { useDeleteCraft } from "@/features/dashboard/craft/useDeleteCraft";
import { useFetchCraft } from "@/features/dashboard/craft/useFetchCraft";
import { useUpdateCraft } from "@/features/dashboard/craft/useUpdateCraft";
import { useCreateCraftVariant } from "@/features/dashboard/craftVariant/useCreateCraftVariant";
import { useDeleteCraftVariant } from "@/features/dashboard/craftVariant/useDeleteCraftVariant";
import { useUpdateCraftVariant } from "@/features/dashboard/craftVariant/useUpdateCraftVariant";
import { useCreateDetailCraft } from "@/features/detailCraft/useCreateDetailCraft";
import { useFetchStoreDetailCrafts } from "@/features/detailCraft/useFetchStoreDetailCraft";
import { type CraftVariant, type Craft } from "@/type/schema/CraftSchema";
import {
  DetailCraftManagementResponse,
  DetailCraftSchema,
} from "@/type/schema/DetailCraftSchema";
import {
  confirmDeleteAlert,
  cornerAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { useModal } from "@/utils/ModalUtils";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useCraftManagement = (id_souvenir_place: string) => {
  const [formType, setFormType] = useState<"craft" | "variant" | "detail">(
    "craft"
  );

  const [view, setView] = useState<"craft" | "variant">("craft");
  const [isEditCraft, setEditCraft] = useState<string | null>(null);
  const { isOpen: isOpenForm, toggleModal: toggleForm } = useModal();
  const { isOpen: isOpenList, toggleModal: toggleList } = useModal();

  const [selectedDetailVariant, setSelectedDetailVariant] =
    useState<DetailCraftManagementResponse | null>(null);
  const [selectedImg, setSelectedImg] = useState<string>(
    selectedDetailVariant?.craftGalleries?.[0]?.url ?? ""
  );

  useEffect(() => {
    if (selectedDetailVariant?.craftGalleries?.[0]?.url) {
      setSelectedImg(selectedDetailVariant?.craftGalleries?.[0]?.url);
    }
  }, [selectedDetailVariant]);

  const {
    data: crafts,
    isLoading: craftsLoading,
    refetch: refetchCrafts,
  } = useFetchCraft();

  const {
    data: detailCrafts,
    isLoading: detailCraftsLoading,
    refetch: refetchDetailCraft,
  } = useFetchStoreDetailCrafts<DetailCraftManagementResponse>(
    id_souvenir_place,
    ["craft", "craftGalleries"]
  );

  const getDefaultCraft = (): Craft => ({
    id: "",
    name: "",
  });

  const getDefaultDetailCraft = (): DetailCraftSchema & {
    id_craft: string;
  } => ({
    id_craft: "",
    craft_variant_id: "",
    price: "" as unknown as number,
    weight: "" as unknown as number,
    modal: "" as unknown as number,
    stock: "" as unknown as number,
    description: "",
    images: [],
  });

  const getDefaultVariant = (): CraftVariant => ({
    id: "",
    id_craft: "",
    name: "",
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
      cornerAlert("Craft added successfully");
      refetchCrafts();
    },
  });
  const { mutate: createVariant, isPending: variantPending } =
    useCreateCraftVariant({
      onSuccess: () => {
        toggleForm();
        cornerAlert("Craft variant added successfully");
        refetchCrafts();
      },
    });

  const { mutate: updateVariant, isPending: updateVariantPending } =
    useUpdateCraftVariant({
      onSuccess: () => {
        cornerAlert("Craft variant updated successfully");
        toggleEditCraft(null);
        refetchCrafts();
      },
    });
  const { mutateAsync: deleteVariant } = useDeleteCraftVariant({
    onSuccess: () => {
      cornerAlert("Craft variant deleted successfully");
      refetchCrafts();
    },
  });
  const { mutate: updateCraft, isPending: updateCraftPending } = useUpdateCraft(
    {
      onSuccess: async () => {
        toggleEditCraft(null);
        cornerAlert("Craft edited successfully");

        refetchCrafts();
      },
    }
  );

  const { mutateAsync: deleteCraft, isPending: deletingCraft } = useDeleteCraft(
    {
      onSuccess: () => {
        cornerAlert("Craft deleted successfully");
        refetchCrafts();
      },
    }
  );

  const { mutate: createDetailCraft, isPending: detailCraftPending } =
    useCreateDetailCraft({
      onSuccess: () => {
        cornerAlert("Craft detail added successfully");

        refetchDetailCraft();
        toggleForm();
      },
    });

  const isLoading = craftsLoading || detailCraftsLoading;
  const isPending = craftPending || variantPending || detailCraftPending;

  useEffect(() => {
    if (deletingCraft) {
      showLoadingAlert();
    }
  }, [deletingCraft]);
  const initialValues: Craft | CraftVariant | DetailCraftSchema =
    useMemo(() => {
      switch (formType) {
        case "craft":
          return getDefaultCraft();
        case "variant":
          return getDefaultVariant();
        case "detail":
          return getDefaultDetailCraft();
      }
    }, [formType]);

  const handleCraftForm = useCallback(() => {
    toggleForm();
    setFormType("craft");
  }, [toggleForm]);

  const handleVariantForm = useCallback(() => {
    toggleForm();
    setFormType("variant");
  }, [toggleForm]);

  const handleDetailCraftForm = useCallback(() => {
    toggleForm();
    setFormType("detail");
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
      toggleEditCraft(null);

      return cornerAlert("nothing change");
    }
    updateCraft({ id: values.id, name: values.craft_name });
  };

  const handleEditVariant = async (values: {
    id: string;
    id_craft: string;
    variant_name: string;
  }) => {
    console.log(values);
    const currentCraft = crafts?.find((v) =>
      v.variants.find((variant) => variant.id === values.id)
    );
    const currentVariant = currentCraft?.variants.find(
      (variant) => variant.id === values.id
    );
    console.log("currentVariant", currentVariant);
    if (currentVariant?.name === values.variant_name) {
      toggleEditCraft(null);
      return cornerAlert("nothing change");
    }
    updateVariant({
      id: values.id,
      id_craft: values.id_craft,
      name: values.variant_name,
    });
  };

  const handleSubmit = (values: CraftVariant | Craft | DetailCraftSchema) => {
    console.log("handleSubmit", values);
    const detailValues = values as DetailCraftSchema;
    console.log(values);
    if (formType === "variant") {
      return createVariant(values as CraftVariant);
    } else if (formType === "craft") {
      return createCraft(values as Craft);
    } else if (formType === "detail") {
      const formData = createFormData<DetailCraftSchema>(detailValues);
      return createDetailCraft(formData);
    }
  };

  return {
    isOpenForm,
    isOpenList,
    toggleList,
    handleVariantForm,
    formType,
    initialValues: initialValues as Craft | CraftVariant | DetailCraftSchema,
    handleSubmit,
    isPending,
    crafts,
    detailCrafts,
    handleCraftForm,
    isLoading,
    handleDeleteVariant,
    handleEditCraft,
    updateCraftPending,
    isEditCraft,
    toggleEditCraft,
    handleDeleteCraft,
    toggleForm,
    selectedDetailVariant,
    setSelectedDetailVariant,
    selectedImg,
    setSelectedImg,
    handleDetailCraftForm,
    view,
    setView,
    handleEditVariant,
    updateVariantPending,
  };
};
