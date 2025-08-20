import { useFetchReservations } from "@/features/reservation/useFetchReservation";
import { useMemo, useState } from "react";
import useSearchTable from "./useSearchTable";
import dayjs from "dayjs";
import useTableManagement from "./useTableManagement";
import { ReservationSchema } from "@/type/schema/ReservationSchema";
import { useModal } from "@/utils/ModalUtils";

export const useManagePackageReservation = () => {
  const { isOpen, toggleModal } = useModal();
  const [reservation, setReservation] = useState<ReservationSchema | null>(
    null
  );
  const { data, isLoading } = useFetchReservations();

  const { searchTerm, handleSearch } = useSearchTable();
  const filteredData = useMemo(() => {
    return (
      data?.filter((item) => {
        const searchabled = {
          customer_name: item?.customer?.fullname,
          username: item?.customer?.username,
          package: item?.package?.name,
          requestDate: dayjs(item?.request_date).format(
            "DD MMMM YYYY, HH:mm:ss A"
          ),
        };

        return Object.keys(searchabled).some((key) =>
          searchabled[key as keyof typeof searchabled]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      }) || []
    );
  }, [data, searchTerm]);

  const handleHistoryClick = (item: ReservationSchema) => {
    setReservation(item);
    toggleModal();
  };
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
    isLoading,
    searchTerm,
    handleSearch,
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
    handleHistoryClick,
    isOpen,
    toggleModal,
    reservation,
  };
};
