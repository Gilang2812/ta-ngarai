import { getAttractionCategory } from "./../utils/common/getAttractionCategory";
import { useFetchTraditional } from "@/features/dashboard/traditional/useFetchTraditional";
import { useEffect, useMemo, useState } from "react";
import useSearchTable from "./useSearchTable";
import useTableManagement from "./useTableManagement";
import { TraditionalForm, TraditionalSchema } from "@/type/schema/ObjectSchema";
import useCreateTraditional from "@/features/dashboard/traditional/useCreateTraditional";
import { useModal } from "@/utils/ModalUtils";
import { createFormData } from "@/utils/common/createFormData";
import { formatImageUrls } from "@/lib/imgUrlFormatter";
import { useUpdateTraditional } from "@/features/dashboard/traditional/useUpdateTraditional";
import { useDeleteTraditional } from "@/features/dashboard/traditional/useDeleteTraditional";
import {
  confirmDeleteAlert,
  cornerAlert,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { LatLngType } from "@/type/props/mapProps";

const useManageTraditional = () => {
  const { data, isLoading, refetch } = useFetchTraditional();
  const { isOpen, toggleModal } = useModal();
  const [initialValues, setInitialValues] = useState<
    TraditionalForm & LatLngType
  >({
    id: "",
    name: "",
    address: "",
    contact_person: "",
    ticket_price: 0,
    category: 1,
    min_capacity: 0,
    open: "",
    close: "",
    description: "",
    video_url: "",
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
        address: item.address,
        contact_person: item.contact_person,
        category: getAttractionCategory(item.category),
        price: item.ticket_price,
        open: item.open,
        close: item.close,
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

  const { mutate: createTraditional, isPending: isCreating } =
    useCreateTraditional({
      onSuccess: () => {
        refetch();
        toggleModal();
        cornerAlert("Traditional house created successfully");
      },
    });

  const { mutate: updateTraditional, isPending: isUpdating } =
    useUpdateTraditional({
      onSuccess: () => {
        refetch();
        cornerAlert("Traditional house updated successfully");
        toggleModal();
      },
    });

  const { mutateAsync: deleteTraditional, isPending: isDeleting } =
    useDeleteTraditional({
      onSuccess: () => {
        refetch();
        cornerAlert("Traditional house deleted successfully");
      },
    });

  const handleAddTraditional = () => {
    toggleModal();
    setInitialValues((prev) => ({
      ...prev,
      name: "",
      address: "",
      contact_person: "",
      ticket_price: 0,
      category: 1,
      min_capacity: 0,
      open: "",
      close: "",
      description: "",
      video_url: "",
      geom: "",
      latitude: 0,
      longitude: 0,
      images: [],
    }));
  };

  const handleEditTraditional = (traditional: TraditionalSchema) => { 
    toggleModal();
    const images = formatImageUrls(
      traditional?.galleries?.map((gallery) => gallery.url) || []
    );
    const geom = JSON.stringify(traditional?.geom);
    setInitialValues((prev) => ({
      ...prev,
      id: traditional?.id || "",
      name: traditional?.name || "",
      address: traditional?.address || "",
      contact_person: traditional?.contact_person || "",
      ticket_price: traditional?.ticket_price || 0,
      category: traditional?.category || 1,
      min_capacity: traditional?.min_capacity || 0,
      open: traditional?.open || "",
      close: traditional?.close || "",
      description: traditional?.description || "",
      video_url: traditional?.video_url || "",
      geom,
      images: images,
    }));
  };

  const handleDeleteTraditional = (id: string, name: string) => {
    confirmDeleteAlert("traditional house", name, async () => {
      await deleteTraditional(id);
    });
  };

  const handleSubmit = (values: typeof initialValues) => {
    const formData = createFormData(values);
    if (initialValues.id) {
      updateTraditional(formData); 
    } else { 

      createTraditional(formData);
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
    handleAddTraditional,
    handleEditTraditional,
    handleDeleteTraditional,
    handleSubmit,
    toggleModal,
  };
};

export default useManageTraditional;
