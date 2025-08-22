import { useFetchWorship } from "@/features/dashboard/worship/useFetchWorship";
import { useMemo, useState, useEffect } from "react";
import useSearchTable from "./useSearchTable";
import useTableManagement from "./useTableManagement";
import { WorshipForm, WorshipSchema } from "@/type/schema/ObjectSchema";
import { useModal } from "@/utils/ModalUtils";
import { createFormData } from "@/utils/common/createFormData";
import { formatImageUrls } from "@/lib/imgUrlFormatter";
import { useCreateWorship } from "@/features/dashboard/worship/useCreateWorship";
import { useUpdateWorship } from "@/features/dashboard/worship/useUpdateWorship";
import { useDeleteWorship } from "@/features/dashboard/worship/useDeleteWorship";
import {
  confirmDeleteAlert,
  cornerAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { LatLngType } from "@/type/props/mapProps";

const useManageWorship = () => {
  const { data, isLoading, refetch } = useFetchWorship();
  const { isOpen, toggleModal } = useModal();

  const [initialValues, setInitialValues] = useState<WorshipForm & LatLngType>({
    id: "",
    name: "",
    address: "",
    capacity: 0,
    description: "",
    status: 1,
    geom: "",
    images: [],
    latitude: 0,
    longitude: 0,
  });
  const { handleSearch, searchTerm } = useSearchTable();
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data?.filter((item) => {
      const request = {
        id: item.id,
        name: item.name,
        capacity: item.capacity,
      };
      return Object.values(request).some((value) =>
        String(value)
          .trim()
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase())
      );
    });
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

  const { mutate: createWorship, isPending: isCreating } = useCreateWorship({
    onSuccess: () => {
      refetch();
      toggleModal();
      cornerAlert("Worship created successfully");
    },
  });

  const { mutate: updateWorship, isPending: isUpdating } = useUpdateWorship({
    onSuccess: () => {
      refetch();
      cornerAlert("Worship updated successfully");
      toggleModal();
    },
  });

  const { mutateAsync: deleteWorship, isPending: isDeleting } =
    useDeleteWorship({
      onSuccess: () => {
        refetch();
        cornerAlert("Worship deleted successfully");
      },
    });

  const handleAddWorship = () => {
    toggleModal();
    setInitialValues((prev) => ({
      ...prev,
      id: "",
      name: "",
      address: "",
      capacity: 0,
      description: "",
      status: 1,
      geom: "",
      images: [],
    }));
  };

  const handleEditWorship = (worship: WorshipSchema) => {
    toggleModal();
    const images = formatImageUrls(
      worship?.galleries?.map((gallery) => gallery.url) || []
    );
    const geom =
      typeof worship.geom !== "string"
        ? JSON.stringify(worship.geom)
        : worship.geom;
    setInitialValues((prev) => ({
      ...prev,
      ...worship,
      images: images,
      geom
    }));
  };

  const handleDeleteWorship = (id: string, name: string) => {
    confirmDeleteAlert("worship", name, async () => {
      await deleteWorship(id);
    });
  };

  const handleSubmit = (values: typeof initialValues) => {
    const formData = createFormData(values);
    if (initialValues.id) {
      updateWorship(formData);
    } else {
      createWorship(formData);
    }
  };

  useEffect(() => {
    if (isDeleting) {
      showLoadingAlert();
    }
  }, [isDeleting]);

  return {
    isOpen,
    data,
    isLoading,
    isPending: isCreating || isUpdating,
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
    initialValues,
    handleAddWorship,
    handleEditWorship,
    handleDeleteWorship,
    handleSubmit,
    toggleModal,
  };
};

export default useManageWorship;
