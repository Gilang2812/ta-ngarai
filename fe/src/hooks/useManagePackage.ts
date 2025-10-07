import { useFetchPackages } from "@/features/web/package/useFetchPackage";
import { PackageSchema } from "@/types/schema/PackageSchema";
import useSearchTable from "./useSearchTable";
import { useEffect, useMemo } from "react";
import useTableManagement from "./useTableManagement";
import { useDeletePackage } from "@/features/web/package/useDeletePackage";
import {
  confirmDeleteAlert,
  cornerAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";

const useManagePackage = () => {
  const { data, isLoading, refetch } = useFetchPackages<PackageSchema>({
    gallery: false,
    package: false,
    service: false,
    custom: true,
  });
  const { mutateAsync: deletePackage, isPending } = useDeletePackage({
    onSuccess: () => {
      refetch();
      cornerAlert("Package deleted successfully");
    },
  });
  const { searchTerm, handleSearch } = useSearchTable();

  const filteredData = useMemo(
    () =>
      Array.isArray(data)
        ? data?.filter((item) => {
            const { id, name } = item;

            return Object.keys({ id, name }).some((key) => {
              const values = item[key as keyof PackageSchema];
              return String(values)
                .toLowerCase()
                .includes(searchTerm.toLowerCase().trim());
            });
          }) || []
        : [],
    [data, searchTerm]
  );

  const {
    currentItems,
    currentPage,
    handleItemsPerPage,
    handleNextPage,
    handlePrevPage,
    indexOfFirstItem,
    indexOfLastItem,
    itemsPerPage,
    totalPages,
    totalItems,
  } = useTableManagement<PackageSchema>(filteredData);

  const handleDeletePackage = (p: PackageSchema) => {
    confirmDeleteAlert(
      "Package",
      p.name,
      async () => await deletePackage(p.id)
    );
  };

  useEffect(() => {
    if (isPending) {
      showLoadingAlert("deleting package...");
    }
  }, [isPending]);
  return {
    isLoading,
    searchTerm,
    currentItems,
    currentPage,
    handleItemsPerPage,
    handleNextPage,
    handlePrevPage,
    indexOfFirstItem,
    indexOfLastItem,
    itemsPerPage,
    totalPages,
    handleSearch,
    totalItems,
    handleDeletePackage,
  };
};

export default useManagePackage;
