import { getAttractionCategory } from "./../utils/common/getAttractionCategory";
import { useFetchAttraction } from "@/features/dashboard/attraction/useFetchAttraction";
import { useEffect, useMemo, useState } from "react";
import useSearchTable from "./useSearchTable";
import useTableManagement from "./useTableManagement";
import { AttractionForm, AttractionSchema } from "@/type/schema/ObjectSchema";
import useCreateAttraction from "@/features/dashboard/attraction/useCreateAttraction";
import { useModal } from "@/utils/ModalUtils";
import { createFormData } from "@/utils/common/createFormData";
import { formatImageUrls } from "@/lib/imgUrlFormatter";
import { useUpdateAttraction } from "@/features/dashboard/attraction/useUpdateAttraction";
import { useDeleteAttraction } from "@/features/dashboard/attraction/useDeleteAttraction";
import {
  confirmDeleteAlert,
  cornerAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { LatLngType } from "@/type/props/mapProps";

const useManageAttraction = () => {
  const { data, isLoading, refetch } = useFetchAttraction();
  const { isOpen, toggleModal } = useModal();
  const [initialValues, setInitialValues] = useState<
    AttractionForm & LatLngType
  >({
    id: "",
    name: "",
    type: "",
    category: "" as unknown as 1 | 2,
    min_capacity: "" as unknown as number,
    price: 0,
    description: "",
    geom: "",
    latitude: 0,
    longitude: 0,
    images: [],
  });
  const { handleSearch, searchTerm } = useSearchTable();
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data?.filter((item) => {
      const request = {
        id: item.id,
        name: item.name,
        type: item.type,
        category: getAttractionCategory(item.category),
        price: item.price,
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

  const { mutate: createAttraction, isPending: isCreating } =
    useCreateAttraction({
      onSuccess: () => {
        refetch();
        toggleModal();
        cornerAlert("Attraction created successfully");
      },
    });

  const { mutate: updateAttraction, isPending: isUpdating } =
    useUpdateAttraction({
      onSuccess: () => {
        refetch();
        cornerAlert("Attraction updated successfully");
        toggleModal();
      },
    });

  const { mutateAsync: deleteAttraction, isPending: isDeleting } =
    useDeleteAttraction({
      onSuccess: () => {
        refetch();
        cornerAlert("Attraction deleted successfully");
      },
    });

  const handleAddAttraction = () => {
    toggleModal();
    setInitialValues((prev) => ({
      ...prev,
      id: "",
      name: "",
      type: "",
      category: "" as unknown as 1 | 2,
      min_capacity: "" as unknown as number,
      price: 0,
      geom: "",
      description: "",
      images: [],
    }));
  };

  const handleEditAttraction = (attraction: AttractionSchema) => {
    console.log("Editing attraction:", attraction);
    toggleModal();
    const images = formatImageUrls(
      attraction?.galleries?.map((gallery) => gallery.url) || []
    );
    const geom = JSON.stringify(attraction?.geom);
    setInitialValues((prev) => ({
      ...prev,
      ...attraction,
      geom,
      images: images,
    }));
  };

  const handleDeleteAttraction = (id: string, name: string) => {
    confirmDeleteAlert("attraction", name, async () => {
      await deleteAttraction(id);
    });
  };

  const handleSubmit = (values: typeof initialValues) => {
    const formData = createFormData(values);
    if (initialValues.id) {
      updateAttraction(formData);
      console.log("edit");
    } else {
      console.log("create");

      createAttraction(formData);
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
    handleAddAttraction,
    handleEditAttraction,
    handleDeleteAttraction,
    handleSubmit,
    toggleModal,
  };
};

export default useManageAttraction;
