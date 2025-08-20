import { useDeleteMarketplace } from "@/features/dashboard/marketplace/useDeleteMarketplace";
import {
  confirmDeleteAlert,
  cornerAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { useModal } from "@/utils/ModalUtils";
import { useEffect, useState } from "react";
import { useFetchUserSouvenirPlace } from "@/features/dashboard/marketplace/useFetchUserSouvenirPlace";

import { UserMarketplaceSchema } from "@/type/schema/SouvenirSchema";
import { useCreateDetailUserSouvenir } from "@/features/dashboard/marketplace/useCreateDetailUserSouvenir";

export const useManageUserMarketplace = () => {
  const { data, isLoading, refetch } = useFetchUserSouvenirPlace();
  const [modalType, setModalType] = useState<"form" | "detail" | "info">(
    "form"
  );
  const { isOpen, toggleModal } = useModal();
  const [selectedSouvenir, setSelectedSouvenir] =
    useState<UserMarketplaceSchema | null>(null);

  const initialValues = {
    id_souvenir_place: "",
    user: "",
  };
  const { mutateAsync: deleteMarketplace, isPending: deletingMarketplace } =
    useDeleteMarketplace({
      onSuccess: () => {
        cornerAlert("success delete marketplace");
        refetch();
      },
    });

  const { mutate: recruitStaff, isPending: recruiting } =
    useCreateDetailUserSouvenir({
      onSuccess: () => {
        cornerAlert("recruiting has been send wait for user to confirm");
        toggleModal();
      },
    });

  const handleDelete = (name: string, id: string) => {
    confirmDeleteAlert("marketplace", name, async () => {
      await deleteMarketplace(id);
    });
  };

  useEffect(() => {
    if (deletingMarketplace) {
      showLoadingAlert();
    }
  }, [deletingMarketplace]);

  const handleDetailSouvenir = (souvenir: UserMarketplaceSchema) => {
    setSelectedSouvenir(souvenir);
    toggleModal();
    setModalType("detail");
  };

  const handleOpenForm = () => {
    toggleModal();
    setModalType("form");
  };

  const handleInfoRecruit = () => {
    toggleModal();
    setModalType("info");
  };
  const handleSubmit = ({ id_souvenir_place, user }: typeof initialValues) => {
    console.log("Submitting form with values:", { id_souvenir_place, user });
    recruitStaff({ id_souvenir_place, user });
  };
  return {
    isOpen,
    handleDelete,
    handleDetailSouvenir,
    toggleModal,
    isLoading,
    data,
    selectedSouvenir,
    modalType,
    handleOpenForm,
    handleSubmit,
    initialValues,
    recruiting,
    handleInfoRecruit,
  };
};
