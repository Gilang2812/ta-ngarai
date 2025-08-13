import { useFetchHomestay } from "@/features/dashboard/homestay/useFetchHomestay";
import useSearchTable from "./useSearchTable";
import { useMemo } from "react";
import useTableManagement from "./useTableManagement";
import { useDeleteHomestay } from "@/features/dashboard/homestay/useDeleteHomestay";
import { confirmDeleteAlert, cornerAlert } from "@/utils/AlertUtils";
import { HomestaySchema } from "@/type/schema/HomestaySchema";

const useManageHomestayPage = () => {
  const { data, isLoading, refetch } = useFetchHomestay();
  const { searchTerm, handleSearch } = useSearchTable();
  const filteredData = useMemo(() => {
    return Array.isArray(data)
      ? data.filter((item) => {
          return Object.values(item).some((value) => {
            return String(value)
              .toLowerCase()
              .trim()
              .includes(searchTerm.toLowerCase().trim());
          });
        })
      : [];
  }, [searchTerm, data]);
  const { mutateAsync } = useDeleteHomestay({
    onSuccess: () => {
      cornerAlert("homestay");
      refetch();
    },
  });
  const HandleDelete = (homestay: HomestaySchema) => {
    confirmDeleteAlert("homestay", homestay.name, () =>
      mutateAsync(homestay.id)
    );
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
    HandleDelete,
    isLoading,
    searchTerm,
    handleSearch,
    currentItems,
    currentPage,
    itemsPerPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    totalItems,
    handleNextPage,
    handlePrevPage,
    handleItemsPerPage,
  };
};

export default useManageHomestayPage;
