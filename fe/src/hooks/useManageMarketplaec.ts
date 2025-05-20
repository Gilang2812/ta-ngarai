import { useCreateMarketplace } from "@/features/dashboard/marketplace/useCreateMarketplace";
import { useDeleteMarketplace } from "@/features/dashboard/marketplace/useDeleteMarketplace";
import { useFetchSouvenirPlace } from "@/features/dashboard/marketplace/useFetchSouvenirPlace";
import { useUpdateMarketplace } from "@/features/dashboard/marketplace/useUpdateMarketplace";
import { FormMarketplace } from "@/type/schema/MarketplaceSchema";
import { SouvenirPlaceSchema } from "@/type/schema/PackageSchema";
import { confirmDeleteAlert, cornerAlert } from "@/utils/AlertUtils";
import { useModal } from "@/utils/ModalUtils";
import { useState } from "react"; 

export const useManageMarketplace = () => {
  const { data, isLoading, refetch } = useFetchSouvenirPlace();
  const { isOpen, toggleModal } = useModal();
  const [formType, setFormType] = useState<"create" | "edit">("create");

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
        cornerAlert("success create umkm");
        toggleModal();
        refetch();
      },
    });
  const { mutate: updateMarketplace, isPending: isPendingUpdate } =
    useUpdateMarketplace({
      onSuccess: () => {
        cornerAlert("success update umkm");
        toggleModal();
        refetch();
      },
    });
  const { mutateAsync: deleteMarketplace } = useDeleteMarketplace({
    onSuccess: () => {
      cornerAlert("success delete umkm");
      refetch();
    },
  });

  const handleSubmit = (values: FormMarketplace) => {
    if (initialValues.id) {
      updateMarketplace(values);
    } else {
      createMarketplace(values);
    }
  };
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

  return {
    handleSubmit,
    handleOpenEditModal,
    isPending: isPendingCreate || isPendingUpdate,
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
