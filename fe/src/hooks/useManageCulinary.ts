import { useFetchCulinary } from "@/features/dashboard/culinary/useFetchCulinary";
import { useMemo, useState, useEffect } from "react";
import useSearchTable from "./useSearchTable";
import useTableManagement from "./useTableManagement";
import { CulinaryForm, CulinarySchema } from "@/type/schema/ObjectSchema";
import { useModal } from "@/utils/ModalUtils";
import { createFormData } from "@/utils/common/createFormData";
import { formatImageUrls } from "@/lib/imgUrlFormatter";
import { useCreateCulinary } from "@/features/dashboard/culinary/useCreateCulinary";
import { useUpdateCulinary } from "@/features/dashboard/culinary/useUpdateCulinary";
import { useDeleteCulinary } from "@/features/dashboard/culinary/useDeleteCulinary";
import {
  confirmDeleteAlert,
  cornerAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { LatLngType } from "@/type/props/mapProps";

const useManageCulinary = () => {
  const { data, isLoading, refetch } = useFetchCulinary();
  const { isOpen, toggleModal } = useModal();
  const [initialValues, setInitialValues] = useState<CulinaryForm & LatLngType>(
    {
      id: "",
      name: "",
      address: "",
      capacity: 0,
      open: "",
      close: "",
      contact_person: "",
      description: "",
      images: [],
      latitude: 0,
      longitude: 0,
      status: "" as unknown as number,
      geom: "",
    }
  );
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

  const { mutate: createCulinary, isPending: isCreating } = useCreateCulinary({
    onSuccess: () => {
      refetch();
      toggleModal();
      cornerAlert("Culinary created successfully");
    },
  });

  const { mutate: updateCulinary, isPending: isUpdating } = useUpdateCulinary({
    onSuccess: () => {
      refetch();
      cornerAlert("Culinary updated successfully");
      toggleModal();
    },
  });

  const { mutateAsync: deleteCulinary, isPending: isDeleting } =
    useDeleteCulinary({
      onSuccess: () => {
        refetch();
        cornerAlert("Culinary deleted successfully");
      },
    });

  const handleAddCulinary = () => {
    toggleModal();
    setInitialValues((prev) => ({
      ...prev,
      id: "",
      name: "",
      address: "",
      capacity: 0,
      open: "",
      status: 1,
      geom: "",
      close: "",
      contact_person: "",
      description: "",

      images: [],
    }));
  };

  const handleEditCulinary = (culinary: CulinarySchema) => {
    toggleModal();
    const images = formatImageUrls(
      culinary?.galleries?.map((gallery) => gallery.url) || []
    );
    const geom = JSON.stringify(culinary.geom);
    setInitialValues((prev) => ({
      ...prev,
      ...culinary,
      geom,
      images: images,
    }));
  };

  const handleDeleteCulinary = (id: string, name: string) => {
    confirmDeleteAlert("culinary", name, async () => {
      await deleteCulinary(id);
    });
  };

  const handleSubmit = (values: typeof initialValues) => {
    const formData = createFormData(values);
    if (initialValues.id) {
      updateCulinary(formData);
    } else {
      createCulinary(formData);
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
    handleAddCulinary,
    handleEditCulinary,
    handleDeleteCulinary,
    handleSubmit,
    toggleModal,
  };
};

export default useManageCulinary;
