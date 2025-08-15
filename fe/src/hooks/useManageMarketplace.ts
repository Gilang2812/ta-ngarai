import { useDeleteMarketplace } from "@/features/dashboard/marketplace/useDeleteMarketplace";
import { useFetchSouvenirPlace } from "@/features/dashboard/marketplace/useFetchSouvenirPlace";
import { SouvenirPlaceSchema } from "@/type/schema/PackageSchema";
import { confirmDeleteAlert, cornerAlert, showLoadingAlert } from "@/utils/AlertUtils";
import { useModal } from "@/utils/ModalUtils";
import { useEffect, useState } from "react";
import useFormMarketplace from "./useFormMarketplace";

export const useManageMarketplace = () => {
  const { data, isLoading, refetch } = useFetchSouvenirPlace();
  const { isOpen, toggleModal } = useModal();
  const [formType, setFormType] = useState<"create" | "edit">("create");

  const onSuccessForm = () => {
    refetch();
    toggleModal();
  };
  const { initialValues, setInitialValues, isPending, handleSubmit } =
    useFormMarketplace({
      onSuccessForm,
    });

  const { mutateAsync: deleteMarketplace, isPending: deletingMarketplace } =
    useDeleteMarketplace({
      onSuccess: () => {
        cornerAlert("success delete umkm");
        refetch();
      },
    });

  const handleDelete = (name: string, id: string) => {
    confirmDeleteAlert("marketplace", name, async () => {
      await deleteMarketplace(id);
    });
  };
  const handleOpenCreateModal = () => {
    setFormType("create");
    setInitialValues({
      id: "",
      name: "",
      address: "",
      contact_person: "",
      close: "",
      open: "",
      description: "",
      geom: "",
    });
    toggleModal();
  };
  const handleOpenEditModal = (souvenirPlace: SouvenirPlaceSchema) => {
    setFormType("edit");
    setInitialValues({
      id: souvenirPlace.id,
      name: souvenirPlace.name,
      address: souvenirPlace.address,
      contact_person: souvenirPlace.contact_person,
      close: souvenirPlace.close,
      open: souvenirPlace.open,
      description: souvenirPlace.description,
      geom: JSON.stringify(souvenirPlace.geom) || "", // optional
    });

    toggleModal();
  };

  useEffect(() => {
    if (deletingMarketplace) {
      showLoadingAlert();
    }
  }, [deletingMarketplace]);

  return {
    handleSubmit,
    handleOpenEditModal,
    isPending,
    isOpen,
    initialValues,
    handleDelete,
    toggleModal,
    handleOpenCreateModal,
    isLoading,
    data,
    formType,
  };
};
