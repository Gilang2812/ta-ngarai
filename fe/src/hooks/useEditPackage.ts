import { useGetPackage } from "@/features/web/package/useGetPackage";
import {
  EditPackageSchema,
  PackageServiceGallery,
} from "@/types/schema/PackageSchema";
import { cornerAlert } from "@/utils/AlertUtils";
import { createFormData } from "@/utils/common/createFormData";
import { useUpdateAllPackage } from "@/features/web/package/useUpdateAllPackage";
import { useFetchPackageTypes } from "@/features/web/package/useFetchPackageTypes";
import { formatImageUrls } from "@/lib/imgUrlFormatter";
import { useMemo } from "react";
import usePackageHandler from "./usePackageHandler";
import { findMissingDays } from "@/lib/findMissingDays";
import { ROUTES } from "@/data/routes";
import { useRouter } from "next/navigation";

export const useEditPackage = (id: string) => {
  const { data, isLoading, refetch } = useGetPackage<PackageServiceGallery>(
    id,
    ["gallery", "package", "service"]
  );

  const {
    isOpen,
    toggleModal,
    formType,
    dayInitialValues,
    getActivityInitialValues,
    getServiceInitialValues,
    isPending,
    handleAddActivity,
    handleAddDay,
    handleEditDay,
    handleAddService,
    handleDeleteDay,
    handleDeleteActivity,
    handleDeleteService,
    handleSubmit,
  } = usePackageHandler(id, refetch, findMissingDays(data?.packageDays || []));

  const { data: types } = useFetchPackageTypes();
  const router = useRouter();
  const images = useMemo(
    () =>
      formatImageUrls(
        data?.packageGalleries.map((gallery) => gallery.url) ?? []
      ),
    [data?.packageGalleries]
  );
  const videoUrl = useMemo(
    () => formatImageUrls(data?.video_url ? [data.video_url] : []),
    [data?.video_url]
  );

  const initialValues: EditPackageSchema = {
    id: id,
    name: data?.name || "",
    type_id: data?.type_id || "",
    price: data?.price || ("" as unknown as number),
    min_capacity: data?.min_capacity || ("" as unknown as number),
    contact_person: data?.contact_person || "",
    description: data?.description || "",
    images: images,
    video_url: videoUrl,
  };

  const { mutate: updatePackage, isPending: updatingPackage } =
    useUpdateAllPackage({
      onSuccess: () => {
        refetch();
        cornerAlert("Package updated successfully");
        router.push(ROUTES.DETAIL_PACKAGE(id));
      },
    });

  const handleUpdatePackage = (values: EditPackageSchema) => {
    const formData = createFormData(values);
    updatePackage(formData);
  };

  return {
    updatingPackage,
    initialValues,
    data,
    isLoading,
    handleUpdatePackage,
    types,
    isOpen,
    toggleModal,
    formType,
    dayInitialValues,
    getActivityInitialValues,
    getServiceInitialValues,
    isPending,
    handleAddActivity,
    handleAddDay,
    handleEditDay,
    handleAddService,
    handleDeleteDay,
    handleDeleteActivity,
    handleDeleteService,
    handleSubmit,
  };
};
