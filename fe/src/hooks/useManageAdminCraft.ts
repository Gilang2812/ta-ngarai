import { useCreateCraft } from "@/features/dashboard/craft/useCreateCraft";
import { useDeleteCraft } from "@/features/dashboard/craft/useDeleteCraft";
import { useFetchCraft } from "@/features/dashboard/craft/useFetchCraft";
import { useUpdateCraft } from "@/features/dashboard/craft/useUpdateCraft";
import { useCreateCraftVariant } from "@/features/dashboard/craftVariant/useCreateCraftVariant";
import { useDeleteCraftVariant } from "@/features/dashboard/craftVariant/useDeleteCraftVariant";
import { useUpdateCraftVariant } from "@/features/dashboard/craftVariant/useUpdateCraftVariant";
import { type CraftVariant, type Craft } from "@/types/schema/CraftSchema";
import {
  DetailCraftOrderResponse,
  DetailCraftSchema,
} from "@/types/schema/DetailCraftSchema";
import {
  confirmDeleteAlert,
  cornerAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { useModal } from "@/utils/ModalUtils";
import { useCallback, useEffect, useMemo, useState } from "react";
import useTableManagement from "./useTableManagement";
import useSearchTable from "./useSearchTable";
import { useProductCraft } from "./useProductCraft";

const useManageAdminCraft = () => {
  const { crafts: detailCrafts, isLoading: detailCraftLoading } =
    useProductCraft();
  const [formType, setFormType] = useState<"craft" | "variant">("craft");
  const [view, setView] = useState<"craft" | "variant">("craft");
  const [isEditCraft, setEditCraft] = useState<string | null>(null);
  const { isOpen: isOpenForm, toggleModal: toggleForm } = useModal();
  const { isOpen: isOpenList, toggleModal: toggleList } = useModal();

  const {
    data: crafts,
    isLoading: craftsLoading,
    refetch: refetchCrafts,
  } = useFetchCraft();

  const getDefaultVariant = (): CraftVariant => ({
    id: "",
    id_craft: "",
    name: "",
  });
  const getDefaultCraft = (): Craft => ({
    id: "",
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
  const { mutateAsync: deleteVariant, isPending: deletingVariant } =
    useDeleteCraftVariant({
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
  useEffect(() => {
    if (deletingCraft || deletingVariant) {
      showLoadingAlert();
    }
  }, [deletingCraft, deletingVariant]);
  const handleCraftForm = useCallback(() => {
    toggleForm();
    setFormType("craft");
  }, [toggleForm]);

  const handleVariantForm = useCallback(() => {
    toggleForm();
    setFormType("variant");
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
    const currentCraft = crafts?.find((v) =>
      v.variants.find((variant) => variant.id === values.id)
    );
    const currentVariant = currentCraft?.variants.find(
      (variant) => variant.id === values.id
    ); 
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

  const initialValues: Craft | CraftVariant | DetailCraftSchema =
    useMemo(() => {
      switch (formType) {
        case "craft":
          return getDefaultCraft();
        case "variant":
          return getDefaultVariant();
      }
    }, [formType]);

  const handleSubmit = (values: CraftVariant | Craft) => { 
    if (formType === "variant") {
      return createVariant(values as CraftVariant);
    } else if (formType === "craft") {
      return createCraft(values as Craft);
    }
  };

  const isLoading = craftsLoading || detailCraftLoading;
  const isPending = craftPending || variantPending;
  const { handleSearch, searchTerm } = useSearchTable();
  const [selectedDetailVariant, setSelectedDetailVariant] =
    useState<DetailCraftOrderResponse | null>(null);
  const [selectedImg, setSelectedImg] = useState<string>(
    selectedDetailVariant?.craftGalleries?.[0]?.url ?? ""
  );

  const filteredData = useMemo(() => {
    return (
      detailCrafts?.filter((detail) => {
        const request = {
          store: detail.souvenirPlace.name,
          name: `${detail.variant.craft.name} ${detail.variant.name}`,
          price: detail.price,
          weight: detail.weight + " gram",
          stock: detail.stock + " units",
          modal: detail.modal,
        };
        return Object.values(request)
          .join(" ")
          .toLowerCase()
          .trim()
          .includes(searchTerm.toLowerCase().trim());
      }) ?? []
    );
  }, [detailCrafts, searchTerm]);

  const {
    handleNextPage,
    handlePrevPage,
    handleItemsPerPage,
    currentItems,
    currentPage,
    itemsPerPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    totalItems,
  } = useTableManagement(filteredData);
  return {
    isOpenForm,
    isOpenList,
    toggleList,
    handleVariantForm,
    formType,
    initialValues: initialValues as Craft | CraftVariant,
    handleSubmit,
    isPending,
    crafts,
    handleCraftForm,
    isLoading,
    handleDeleteVariant,
    handleEditCraft,
    updateCraftPending,
    isEditCraft,
    toggleEditCraft,
    handleDeleteCraft,
    toggleForm,
    view,
    setView,
    setSelectedImg,
    handleEditVariant,
    updateVariantPending,
    handleNextPage,
    handlePrevPage,
    handleItemsPerPage,
    currentItems,
    currentPage,
    itemsPerPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    totalItems,
    handleSearch,
    searchTerm,
    selectedDetailVariant,
    selectedImg,
    setSelectedDetailVariant,
  };
};

export default useManageAdminCraft;
