import { useDeleteMarketplace } from "@/features/dashboard/marketplace/useDeleteMarketplace";
import {
  confirmAlert,
  confirmDeleteAlert,
  cornerAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { useModal } from "@/utils/ModalUtils";
import { useEffect, useState } from "react";
import { useFetchUserSouvenirPlace } from "@/features/dashboard/marketplace/useFetchUserSouvenirPlace";

import { UserMarketplaceSchema } from "@/type/schema/SouvenirSchema";
import { useCreateDetailUserSouvenir } from "@/features/dashboard/marketplace/useCreateDetailUserSouvenir";
import { useSession } from "next-auth/react";
import { useDeleteDetailSouvenir } from "@/features/dashboard/marketplace/useDeleteDetailSouvenir";

export const useManageUserMarketplace = () => {
  const { data: session } = useSession();

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
        refetch();
      },
    });

  const { mutate: deleteDetailSouvenir, isPending: deletingDetail } =
    useDeleteDetailSouvenir({
      onSuccess: () => {
        cornerAlert("success delete detail souvenir");
        refetch();
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

  useEffect(() => {
    if (deletingDetail) {
      showLoadingAlert();
    }
  }, [deletingDetail]);

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
    recruitStaff({ id_souvenir_place, user });
  };

  const marketplace = data?.filter((item) =>
    item.detailSouvenir.some(
      (ds) =>
        ds.status !== 0 && Number(session?.user?.id) === Number(ds.user_id)
    )
  );

  const souvenirPlace =
    data
      ?.filter((store) =>
        store.detailSouvenir.some(
          (ds) =>
            ds.status === 1 && Number(session?.user?.id) === Number(ds.user_id)
        )
      )
      ?.map((store) => ({
        id: store.id,
        name: store.name,
      })) || [];

  const isOwner = (souvenirPlace: UserMarketplaceSchema) => {
    return souvenirPlace.detailSouvenir.some(
      (sp) =>
        Number(session?.user?.id) === Number(sp.user_id) && sp.status === 1
    );
  };

  const handleUpdateStatus = (
    user_id: number,
    status: number,
    souvenirPlaceId: string
  ) => {
    const deleteTitle =
      status === 2
        ? "fire this staff"
        : status === 0
        ? "cancel to recruit this staff"
        : "";
    const deleteMessage =
      status === 2
        ? "Are you sure want to fire this staff?"
        : status === 0
        ? "Are you sure want to cancel to recruit this staff?"
        : "";
        console.log(status)
    confirmAlert(deleteTitle, deleteMessage, () => {
      deleteDetailSouvenir({ id_souvenir_place: souvenirPlaceId, user_id });
    });
  };

  return {
    isOpen,
    handleDelete,
    handleDetailSouvenir,
    toggleModal,
    isLoading,
    data: marketplace,
    selectedSouvenir,
    modalType,
    handleOpenForm,
    handleSubmit,
    initialValues,
    recruiting,
    handleInfoRecruit,
    souvenirPlace,
    isOwner,
    handleUpdateStatus,
  };
};
