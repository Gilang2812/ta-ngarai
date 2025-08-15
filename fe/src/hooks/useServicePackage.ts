import { useFetchService } from "@/features/web/package/useFetchService";
import useSearchTable from "./useSearchTable";
import { useEffect, useMemo, useState } from "react";
import useTableManagement from "./useTableManagement";
import { useModal } from "@/utils/ModalUtils";
import { useCreateService } from "@/features/web/package/useCreateService";
import {
  confirmDeleteAlert,
  cornerAlert,
    
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { useUpdateService } from "@/features/web/package/useUpdateService";
import { useDeleteService } from "@/features/web/package/useDeleteService";
import { ServiceFormSchema } from "@/type/schema/ServiceSchema";

export const useServicePackage = () => {
  const [initialValues, setInitialValues] = useState<ServiceFormSchema>({
    id: "",
    name: "",
    category: 1,
    price: 0,
    min_capacity: 0,
  });
  const { data, isLoading, refetch } = useFetchService();
  const { isOpen, toggleModal } = useModal();
  const { searchTerm, handleSearch } = useSearchTable();
  const filteredData = useMemo(() => {
    return (
      data?.filter((item) =>
        Object.keys(item).some((key) =>
          item[key as keyof typeof item]
            .toString()
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

  const { mutate: createService, isPending: creating } = useCreateService({
    onSuccess: () => {
      toggleModal();
      refetch();
      cornerAlert("Service created successfully");
    },
  });

  const { mutate: updateService, isPending: updating } = useUpdateService({
    onSuccess: () => {
      toggleModal();
      refetch();
      cornerAlert("Service updated successfully");
    },
  });
  const { mutate: deleteService, isPending: deleting } = useDeleteService({
    onSuccess: () => {
      refetch();
      cornerAlert("Service deleted successfully");
    },
  });

  const isPending = creating || updating;

  const handleAddService = () => {
    setInitialValues({
      id: "",
      name: "",
      category: "" as unknown as number,
      price: 0,
      min_capacity: 0,
    });
    toggleModal();
  };

  const handleUpdateService = (values: ServiceFormSchema) => {
    setInitialValues({
      id: values.id,
      name: values.name,
      category: values.category,
      price: values.price,
      min_capacity: values.min_capacity,
    });
    toggleModal();
  };

  const handleDeleteService = (values: ServiceFormSchema) => {
    confirmDeleteAlert("Service", values.name, async () => {
      deleteService(values.id);
    });
  };

  useEffect(() => {
    if (deleting) {
      showLoadingAlert();
    }
  }, [deleting]);

  const handleSubmit = (values: ServiceFormSchema) => {
    if (values.id) {
      updateService(values);
    } else {
      createService(values);
    }
  };

  return {
    isOpen,
    initialValues,
    toggleModal,
    isLoading,
    refetch,
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
    isPending,
    handleAddService,
    handleUpdateService,
    handleDeleteService,
    handleSubmit,
  };
};
