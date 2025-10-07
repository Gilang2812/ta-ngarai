import { getReservationStatus } from "./../utils/common/getReservationStatus";
import { useDeleteReservation } from "@/features/reservation/useDeleteReservation";
import { useFetchUserReservations } from "@/features/web/myreservation/useFetchUserReservations";
import { ReservationSchema } from "@/types/schema/ReservationSchema";
import {
  confirmAlert,
  cornerAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { useModal } from "@/utils/ModalUtils";
import { useEffect, useMemo, useState } from "react";
import useSearchTable from "./useSearchTable";
import useTableManagement from "./useTableManagement";
import { localeDate } from "@/utils/localeDate";

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
  const { handleSearch, searchTerm } = useSearchTable();

  const filteredData = useMemo(() => {
    return (
      data?.filter((item) => {
        const requstBody = {
          id: item?.id,
          name: item?.package?.name ?? "homestay reservation",
          request_date: localeDate(item?.request_date),
          check_in: localeDate(item?.check_in),
          status: getReservationStatus(item),
        };
        return Object.values(requstBody).some((val) =>
          val
            .toString()
            .trim()
            .toLowerCase()
            .includes(searchTerm.toLowerCase().trim())
        );
      }) || []
    );
  }, [data, searchTerm]);

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
    isLoading,
    handleSearch,
    handleDeleteReservation,
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
    searchTerm,
  };
};

export default usePackageReservation;
