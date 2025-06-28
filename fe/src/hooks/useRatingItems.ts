import { useFetchRatingItems } from "@/features/web/checkout/useFetchRatingItems";
import { hideLoadingAlert, showLoadingAlert } from "@/utils/AlertUtils";
import { useModal } from "@/utils/ModalUtils";
import { useEffect, useState } from "react";

export const useRatingItems = (id: string) => {
  const { data, isLoading } = useFetchRatingItems(id);
  const { isOpen, toggleModal } = useModal();
  const [selectedItemId, setSelectedItemId] = useState<{
    craft_variant_id: string;
    checkout_id: string;
  }>();


  const handleOpenModal = (craft_variant_id: string, checkout_id: string) => {
    setSelectedItemId({ craft_variant_id, checkout_id });
    toggleModal();
  };

  const handleCloseModal = () => {
    setSelectedItemId(undefined);
    toggleModal();
  };

  const handleSubmitRating = async (values: unknown) => {};
  return {
    data,
    isLoading,
    isOpen,
    handleOpenModal,
    handleCloseModal,
    handleSubmitRating,
  };
};
