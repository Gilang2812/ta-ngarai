import { useCreateDetailHomestayFacility } from "@/features/dashboard/facility/useCreateDetailHomestayFacility";
import { useCreateHomestayFacility } from "@/features/dashboard/facility/useCreateHomestayFacility";
import { useDeleteDetailHomestayFacility } from "@/features/dashboard/facility/useDeleteDetailHomestayFacility";
import { useFetchHomestayFacilities } from "@/features/dashboard/facility/useFetchHomestayFacilities";
import { useGetEditHomestay } from "@/features/dashboard/homestay/useGetEditHomestay";
import { useUpdateHomestay } from "@/features/dashboard/homestay/useUpdateHomestay";
import { formatImageUrls } from "@/lib/imgUrlFormatter";
import { confirmDeleteAlert, cornerAlert } from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { getCentroid } from "@/utils/common/getCentroid";
import { useModal } from "@/utils/ModalUtils";
import {
  CreateDetailFacilityHomestaySchema,
  CreateFacilityHomestaySchema,
  DeleteDetailFacilitySchema,
} from "@/validation/facilitySchema";
import { CreateHomestaySchema } from "@/validation/homestaySchema";
import { useMemo, useState } from "react";

export const useEditHomestay = (id: string) => {
  const { data, isLoading, refetch: refetchHomestay } = useGetEditHomestay(id);
  const { isOpen, toggleModal } = useModal();
  const [formType, setFormType] = useState<"detail" | "facility">("detail");
  const { data: facilities, refetch } = useFetchHomestayFacilities();

  const images = useMemo(() => {
    return formatImageUrls(data?.galleries?.map((g) => g.url) ?? []);
  }, [data]);
  const initialValues: CreateHomestaySchema & { id: string } = {
    id: id,
    geom: JSON.stringify(data?.geom),
    name: data?.name ?? "",
    address: data?.address ?? "",
    contact_person: data?.contact_person ?? "",
    open: String(data?.open),
    close: String(data?.close),
    description: data?.description ?? "",
    images: images,
    latitude: String(getCentroid(data?.geom).lat) ?? "",
    longitude: String(getCentroid(data?.geom).lng) ?? "",
  };

  const facilityInitialValues = {
    name: "",
  };

  const deatailFacilityInitialValues = {
    homestay_id: id,
    facility_homestay_id: "",
    description: "",
  };

  const { mutate: createHomestayFacility } = useCreateHomestayFacility({
    onSuccess: async () => {
      cornerAlert("facility");
      toggleModal();
      refetch();
    },
  });

  const { mutate: createDetailHF } = useCreateDetailHomestayFacility({
    onSuccess: () => {
      cornerAlert("facility detail");
      toggleModal();
      refetchHomestay();
    },
  });

  const handleAddFacility = () => {
    toggleModal();
    setFormType("facility");
  };
  const handleAddDetailFacility = () => {
    toggleModal();
    setFormType("detail");
  };

  const handleFacilitySubmit = (
    values: CreateFacilityHomestaySchema | CreateDetailFacilityHomestaySchema
  ) => {
    if (formType === "facility") {
      createHomestayFacility(values as CreateFacilityHomestaySchema);
    } else if (formType === "detail") {
      createDetailHF(values as CreateDetailFacilityHomestaySchema);
    } else cornerAlert("missing  form type");
  };

  const { mutate: deleteDetailHomesty } = useDeleteDetailHomestayFacility({
    onSuccess: async () => {
      cornerAlert("facility detail deleted");
      refetchHomestay();
    },
  });
  const handleDeletedDetailHomestayFacility = (
    body: DeleteDetailFacilitySchema
  ) => {
    confirmDeleteAlert("Fasilitas", body.facility_homestay_id, () =>
      deleteDetailHomesty(body)
    );
  };
  const { mutate, isPending } = useUpdateHomestay({
    onSuccess: () => {
      cornerAlert("homestay updated successfully");
      refetch();
    },
  });

  const handleSubmit = (values: CreateHomestaySchema) => {
    const formData = createFormData(values);
    mutate(formData);
  };

  return {
    data,
    formType,
    initialValues,
    handleSubmit,
    isPending,
    toggleModal,
    isLoading,
    handleAddDetailFacility,
    handleAddFacility,
    handleFacilitySubmit,
    handleDeletedDetailHomestayFacility,
    isOpen,
    facilityInitialValues,
    deatailFacilityInitialValues,
    facilities,
  };
};
