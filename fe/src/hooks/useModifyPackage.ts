import { useEffect } from "react";
import { useGetPackage } from "@/features/web/package/useGetPackage";

import {
  confirmDeleteAlert,
  cornerAlert,
  cornerError,
} from "@/utils/AlertUtils";
import { PackageService } from "../type/schema/PackageSchema";
import { useDeletePackage } from "@/features/web/package/useDeletePackage";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/data/routes";
import { useFormik } from "formik";
import { useUpdatePackage } from "@/features/web/package/useUpdatePackage";
import usePackageHandler from "./usePackageHandler";
import { findMissingDays } from "@/lib/findMissingDays";

const useModifyPackage = (id: string) => {
  // State management
  const router = useRouter();

  const { data, isLoading, refetch, isSuccess } = useGetPackage<PackageService>(
    id,
    ["package", "service"]
  );

  const {
    isOpen,
    isPending,
    formType,
    dayInitialValues,
    getActivityInitialValues,
    getServiceInitialValues,
    handleAddActivity,
    handleAddDay,
    handleAddService,
    handleDeleteActivity,
    handleDeleteDay,
    handleDeleteService,
    handleEditDay,
    toggleModal,
    handleSubmit,
  } = usePackageHandler(id, refetch, findMissingDays(data?.packageDays || []));

  // Mutations
  const { mutate: updatePackage } = useUpdatePackage<{
    id: string;
    min_capacity: number;
  }>({
    onSuccess: () => {
      cornerAlert("Package updated successfully");
      refetch();
    },
  });

  const { mutateAsync: deletePackage } = useDeletePackage({
    onSuccess: () => {
      cornerAlert("Package deleted successfully");
      router.replace(ROUTES.TOURISM_PACKAGE);
    },
  });

  const capacityFormik = useFormik({
    initialValues: { id: id, min_capacity: data?.min_capacity || 0 },
    onSubmit: (values: { id: string; min_capacity: number }) => {
      updatePackage(values);
    },
  });

  // Computed values

  useEffect(() => {
    if (isSuccess && !data) {
      cornerError("Package not found");
      router.replace(ROUTES.TOURISM_PACKAGE);
    }
  }, [isSuccess, data, router]);

  useEffect(() => {
    if (data?.min_capacity) {
      capacityFormik.setFieldValue("min_capacity", data.min_capacity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.min_capacity]);

  // Event handlers
  const handleDeletePackage = () => {
    confirmDeleteAlert("Package", data?.name ?? "", async () => {
      await deletePackage(id);
    });
  };

  return {
    isOpen,
    isPending,
    formType,
    toggleModal,
    handleAddDay,
    handleAddActivity,
    handleEditDay,
    dayInitialValues,
    getActivityInitialValues,
    handleSubmit,
    data,
    isLoading,
    handleAddService,
    handleDeleteDay,
    handleDeleteActivity,
    handleDeleteService,
    getServiceInitialValues,
    handleDeletePackage,
    capacityFormik,
  };
};

export default useModifyPackage;
