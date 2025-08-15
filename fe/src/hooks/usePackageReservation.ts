import { useDeleteReservation } from "@/features/reservation/useDeleteReservation";
import { useFetchUserReservations } from "@/features/web/myreservation/useFetchUserReservations";
import { ReservationSchema } from "@/type/schema/ReservationSchema";
import {
  confirmAlert,
  cornerAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { useModal } from "@/utils/ModalUtils";
import { useEffect, useState } from "react";

const usePackageReservation = () => {
  const [reservation, setReservation] = useState<ReservationSchema | null>(
    null
  );
  const { data, isLoading } = useFetchUserReservations();
  const { isOpen, toggleModal } = useModal();

  const handleHistoryClick = (r: ReservationSchema) => {
    toggleModal();
    setReservation(r);
  };

  const { mutateAsync: deleteReservation, isPending } = useDeleteReservation({
    onSuccess: () => {
      cornerAlert("Reservation deleted successfully");
    },
  });

  const handleDeleteReservation = (id: string) => {
    confirmAlert(
      "Delete Reservation",
      "Are you sure you want to delete this reservation?",
      () => deleteReservation(id)
    );
  };
  useEffect(() => {
    if (isPending) {
      showLoadingAlert();
    }
  }, [isPending]);

  return {
    reservation,
    setReservation,
    isOpen,
    toggleModal,
    handleHistoryClick,
    data,
    isLoading,
    handleDeleteReservation,
  };
};

export default usePackageReservation;
