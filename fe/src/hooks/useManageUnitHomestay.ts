import { useFetchFacilityUnits } from "@/features/dashboard/facility/useFetchFacilityUnits";
import { useCreateFacilityUnit } from "@/features/dashboard/homestay/useCreateFacilityUnit";
import { useCreateFacilityUnitDetail } from "@/features/dashboard/homestay/useCreateFacilityUnitDetail";
import { useCreateUnitHomestay } from "@/features/dashboard/homestay/useCreateUnitHomestay";
import { useDeleteFacilityUnitHomestay } from "@/features/dashboard/homestay/useDeleteFacilityUnitDetail";
import { useDeleteUnitHomestay } from "@/features/dashboard/homestay/useDeleteUnitHomestay";
import { useFetchUnitTypes } from "@/features/dashboard/homestay/useFetchUnitTypes";
import { useGetHomestay } from "@/features/dashboard/homestay/useGetHomestay";
import { useUpdateUnitHomestay } from "@/features/dashboard/homestay/useUpdateUnitHomestay";
import { formatImageUrls } from "@/lib/imgUrlFormatter";
import { UnitGallerySchema } from "@/type/schema/GalleryHomestaySchema";
import { UnitHomestay } from "@/type/schema/HomestaySchema";
import {
  confirmDeleteAlert,
  cornerAlert,
  cornerError,
  showLoadingAlert,
} from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { useModal } from "@/utils/ModalUtils";
import {
  CreateFacilityFormSchema,
  CreateFacilityUnitFormSchema,
  CreateUnitFormSchema,
} from "@/validation/homestaySchema";
import { useEffect, useState } from "react";
import useLoadingAlert from "./useLoadingAlert";

export const useManageUnitHomestay = (id: string) => {
  const { data, isLoading, refetch } = useGetHomestay(id);
  const { data: unitTypes, isLoading: loadingUnitTypes } = useFetchUnitTypes();
  const { data: facilityUnits, isLoading: loadingFacilityUnits } =
    useFetchFacilityUnits();
  const { isOpen, toggleModal } = useModal();

  const [selectedGalleries, setSelectedGalleries] = useState<
    UnitGallerySchema[] | null
  >(null);
  const [formType, setFormType] = useState<
    "unit" | "detail" | "facility" | "edit" | "gallery"
  >("unit");

  const [unitInitialValues, setUnitInitialValues] =
    useState<CreateUnitFormSchema>({
      homestay_id: id,
      unit_type: "",
      unit_number: "",
      unit_name: "",
      description: "",
      capacity: 0,
      price: 0,
      images: [],
    });

  const facilityUnitInitialValues: CreateFacilityUnitFormSchema = {
    description: "",
    facility_unit_id: "",
    unitHomestay: "",
  };

  const facilityInitialValues: CreateFacilityFormSchema = {
    name: "",
  };

  const { mutate: createUnit, isPending: creatingUnit } = useCreateUnitHomestay(
    {
      onSuccess: () => {
        refetch();
        toggleModal();
      },
    }
  );

  const { mutateAsync: deleteUnit, isPending: deletingUnit } =
    useDeleteUnitHomestay({
      onSuccess: () => {
        cornerAlert("Unit Homestay deleted successfully");
        refetch();
      },
    });

  const { mutate: updateUnit, isPending: updatingUnit } = useUpdateUnitHomestay(
    {
      onSuccess: () => {
        refetch();
        cornerAlert("Unit Homestay updated successfully");
        toggleModal();
      },
    }
  );

  const {
    mutate: createFacilityUnitDetail,
    isPending: creatingFacilityUnitDetail,
  } = useCreateFacilityUnitDetail({
    onSuccess: () => {
      refetch();
      toggleModal();
      cornerAlert("facility created successfully");
    },
  });

  const {
    mutateAsync: deleteFacilityUnitDetail,
    isPending: deletingFacilityUnitDetail,
  } = useDeleteFacilityUnitHomestay({
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: createFacilityUnit, isPending: creatingFacilityUnit } =
    useCreateFacilityUnit({
      onSuccess: () => {
        refetch();
        toggleModal();
        cornerAlert("Facility Unit created successfully");
      },
    });
  const isPending =
    creatingFacilityUnit ||
    creatingUnit ||
    creatingFacilityUnitDetail ||
    updatingUnit;

  useEffect(() => {
    if (deletingFacilityUnitDetail || deletingUnit) {
      showLoadingAlert();
    }
  }, [deletingFacilityUnitDetail, deletingUnit]);

  const handleAddUnit = () => {
    setUnitInitialValues({
      homestay_id: id,
      capacity: 0,
      description: "",
      unit_name: "",
      price: 0,
      unit_type: "",
      images: [],
    });
    setFormType("unit");
    toggleModal();
  };

  const handleAddFacility = () => {
    setFormType("facility");
    toggleModal();
  };

  const handleAddDetailFacility = () => {
    setFormType("detail");
    toggleModal();
  };

  const handleEditUnit = ({
    homestay_id,
    capacity,
    description,
    unit_name,
    price,
    unit_type,
    unit_number,
    unitGalleries,
  }: UnitHomestay) => {
    const images = formatImageUrls(
      unitGalleries?.map((item) => item.url) || []
    );
    console.log(unit_number);
    setFormType("edit");
    setUnitInitialValues({
      homestay_id,
      capacity,
      description,
      unit_name,
      price,
      unit_type,
      unit_number,
      images: images,
    });
    toggleModal();
  };

  const handleShowGallery = (gallery: UnitGallerySchema[]) => {
    setSelectedGalleries(gallery);
    setFormType("gallery");
    toggleModal();
  };

  const handleDeleteUnit = ({
    homestay_id,
    unit_type,
    unit_number,
    unit_name,
  }: {
    homestay_id: string;
    unit_type: string;
    unit_number: string;
    unit_name: string;
  }) => {
    confirmDeleteAlert("Unit Homestay", unit_name, async () => {
      await deleteUnit({
        homestay_id,
        unit_type,
        unit_number,
      });
    });
  };

  const handleDeleteFacilityUnitDetail = ({
    homestay_id,
    unit_type,
    unit_number,
    facility_unit_id,
    facility_name,
  }: {
    homestay_id: string;
    unit_type: string;
    unit_number: string;
    facility_unit_id: string;
    facility_name: string;
  }) => {
    confirmDeleteAlert("Facility Unit Detail", facility_name, async () => {
      await deleteFacilityUnitDetail({
        homestay_id,
        unit_type,
        unit_number,
        facility_unit_id,
      });
    });
  };

  const handleSubmit = (
    values:
      | CreateFacilityFormSchema
      | CreateFacilityUnitFormSchema
      | CreateUnitFormSchema
  ) => {
    const formData = createFormData(values);
    if (formType === "unit") {
      createUnit(formData);
    } else if (formType === "facility") {
      createFacilityUnit(values as CreateFacilityFormSchema);
      console.log(values);
    } else if (formType === "detail") {
      createFacilityUnitDetail(values as CreateFacilityUnitFormSchema);
      console.log(values);
    } else if (formType === "edit") {
      updateUnit(formData);
      console.log(values);
    } else {
      cornerError("Missing form type");
    }
  };

  return {
    data,
    isLoading,
    unitTypes,
    facilityUnits,
    formType,
    selectedGalleries,
    unitInitialValues,
    isOpen,
    toggleModal,
    handleAddUnit,
    handleAddFacility,
    handleAddDetailFacility,
    handleEditUnit,
    handleShowGallery,
    facilityUnitInitialValues,
    facilityInitialValues,
    handleSubmit,
    handleDeleteUnit,
    handleDeleteFacilityUnitDetail,
    isPending,
  };
};
