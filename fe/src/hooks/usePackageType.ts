import { useFetchPackageTypes } from "@/features/web/package/useFetchPackageTypes";
import { useEffect, useMemo, useState } from "react";
import useSearchTable from "./useSearchTable";
import useTableManagement from "./useTableManagement";
import { useCreatePackageType } from "@/features/web/package/useCreatePackageTypes";
import {
  confirmDeleteAlert,
  cornerAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { useUpdatePackageTypes } from "@/features/web/package/useUpdatePackageType";
import { useDeletePackageType } from "@/features/web/package/useDeletePackageType";
import {
  PackageTypeFormSchema,
  PackageTypeSchema,
} from "@/types/schema/PackageSchema";
import { useModal } from "@/utils/ModalUtils";

export const usePackageType = () => {
  const { data, isLoading, refetch } = useFetchPackageTypes();
  const { isOpen, toggleModal } = useModal();
  const [initialValues, setInitialValues] = useState<PackageTypeFormSchema>({
    id: "",
    type_name: "",
  });

  const { handleSearch, searchTerm } = useSearchTable();
  const filteredData = useMemo(() => {
    return (
      data?.filter((item) =>
        Object.keys(item).some((key) =>
          String(item[key as keyof typeof item])
            .toLowerCase()
            .includes(searchTerm.toLowerCase().trim())
        )
      ) || []
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

  const { mutate: createPackageType, isPending: creating } =
    useCreatePackageType({
      onSuccess: () => {
        refetch();
        cornerAlert("Package Type created successfully");
        toggleModal();
      },
    });

  const { mutate: updatePackageType, isPending: updating } =
    useUpdatePackageTypes({
      onSuccess: () => {
        refetch();
        cornerAlert("Package Type updated successfully");
        toggleModal();
      },
    });

  const { mutateAsync: deletePackageType, isPending: deleting } =
    useDeletePackageType({
      onSuccess: () => {
        refetch();
        cornerAlert("Package Type deleted successfully");
      },
    });

  const handleCreatePackageType = () => {
    toggleModal();
    setInitialValues({
      id: "",
      type_name: "",
    });
  };

  const handleUpdatePackageType = (values: PackageTypeFormSchema) => {
    toggleModal();
    setInitialValues(values);
  };

  const handleSubmit = (values: PackageTypeFormSchema) => {
    if (initialValues.id) {
      updatePackageType(values);
    } else {
      createPackageType(values);
    }
  };

  const handleDeletePackageType = (type: PackageTypeSchema) => {
    confirmDeleteAlert("Package Type", type.type_name, async () => {
      await deletePackageType(type.id);
    });
  };

  useEffect(() => {
    if (deleting) {
      showLoadingAlert();
    }
  }, [deleting]);

  return {
    isLoading,
    initialValues,
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
    handleSearch,
    searchTerm,
    handleCreatePackageType,
    handleUpdatePackageType,
    handleDeletePackageType,
    isPending: creating || updating,
    handleSubmit,
    isOpen,
    toggleModal,
  };
};
