import { useMemo, useState } from "react";
import { useGetPackage } from "@/features/web/package/useGetPackage";
import { useCreatePackageDay } from "@/features/web/extend/useCreatePackageDay";
import { useDeletePackageDay } from "@/features/web/extend/useDeletePackageDay";
import { useUpdatePackageDay } from "@/features/web/extend/useUpdatePackageDay";
import { useCreateDetailPackage } from "@/features/web/extend/useCreateDetailPackage";
import { useDeleteDetailPackage } from "@/features/web/extend/useDeleteDetailPackage";
import { useCreateDetailService } from "@/features/web/extend/useCreateDetailService";
import { useDeleteDetailService } from "@/features/web/extend/useDeleteDetailServie";
import { ServiceFormSchema, ServicePackage } from "@/type/schema/ServiceSchema";
import { confirmDeleteAlert, cornerAlert } from "@/utils/AlertUtils";
import {
  DetailPackageSchema,
  PackageActivityFormSchema,
  PackageDay,
  PackageDayFormSchema,
  PackageService,
} from "./../type/schema/PackageSchema";
import { findMissingDays } from "@/lib/findMissingDays";
import { useModal } from "@/utils/ModalUtils";
import { useDeletePackage } from "@/features/web/package/useDeletePackage";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/data/routes";

const useExtendPackage = (id: string) => {
  // State management
  const router = useRouter();
  const { isOpen, toggleModal } = useModal();
  const [formType, setFormType] = useState<
    "day" | "update" | "activity" | "service"
  >("day");
  const { data, isLoading, refetch } = useGetPackage<PackageService>(id, [
    "package",
    "service",
  ]);

  const [dayInitialValues, setDayInitialValues] =
    useState<PackageDayFormSchema>({
      current_day: "" as unknown as number,
      package_id: id,
      day: 0,
      description: "",
      status: 1,
    });

  // Data fetching

  // Mutations
  const { mutateAsync: deletePackage } = useDeletePackage({
    onSuccess: () => {
      cornerAlert("Package deleted successfully");
      router.replace(ROUTES.TOURISM_PACKAGE);
      refetch();
    },
  });

  const { mutate: createPackageDay, isPending: isCreatingPackageDay } =
    useCreatePackageDay({
      onSuccess: () => {
        refetch();
        toggleModal();
        cornerAlert("Package day created successfully");
      },
    });

  const { mutateAsync: deletePackageDay } = useDeletePackageDay({
    onSuccess: () => {
      cornerAlert("Package day deleted successfully");
      refetch();
    },
  });

  const { mutate: updatePackageDay, isPending: isUpdatingPackageDay } =
    useUpdatePackageDay({
      onSuccess: () => {
        refetch();
        toggleModal();
        cornerAlert("Package day updated successfully");
      },
    });

  const { mutate: createDetailPackage, isPending: isCreatingDetailPackage } =
    useCreateDetailPackage({
      onSuccess: () => {
        refetch();
        toggleModal();
        cornerAlert("Activity created successfully");
      },
    });

  const { mutateAsync: deleteDetailPackage } = useDeleteDetailPackage({
    onSuccess: () => {
      refetch();
      cornerAlert("Activity deleted successfully");
    },
  });

  const { mutate: createDetailService, isPending: isCreatingDetailService } =
    useCreateDetailService({
      onSuccess: () => {
        refetch();
        toggleModal();
        cornerAlert("Service created successfully");
      },
    });

  const { mutateAsync: deleteDetailService } = useDeleteDetailService({
    onSuccess: () => {
      refetch();
      toggleModal();
      cornerAlert("Service deleted successfully");
    },
  });

  // Effects

  // Computed values
  const getActivityInitialValues: PackageActivityFormSchema = useMemo(
    () => ({
      package_id: id,
      day: "" as unknown as number,
      activity: "" as unknown as number,
      object_id: "",
      description: "",
      activity_type: "A",
      status: 1,
    }),
    [id]
  );

  const getServiceInitialValues: ServiceFormSchema = useMemo(
    () => ({
      package_id: id,
      service_package_id: "",
      status: 1,
      status_created: 1,
    }),
    [id]
  );

  const isPending =
    isCreatingPackageDay ||
    isUpdatingPackageDay ||
    isCreatingDetailPackage ||
    isCreatingDetailService;

  // Event handlers
  const handleAddDay = () => {
    setFormType("day");

    setDayInitialValues((prev) => ({
      ...prev,
      day: findMissingDays(data?.packageDays || []) as unknown as number,
      description: "",
      current_day: "" as unknown as number,
      status: 1,
    }));
    toggleModal();
  };

  const handleAddActivity = () => {
    setFormType("activity");
    toggleModal();
  };

  const handleEditDay = (day: PackageDay) => {
    setFormType("update");
    setDayInitialValues((prev) => ({
      ...prev,
      package_id: day.package_id,
      current_day: day.day,
      day: day.day,
      description: day.description,
    }));
    toggleModal();
  };

  const handleAddService = () => {
    setFormType("service");
    toggleModal();
  };

  const handleDeleteDay = (day: PackageDay) => {
    confirmDeleteAlert("Day", day.description, async () => {
      await deletePackageDay({ day: day.day, package_id: day.package_id });
    });
  };

  const handleDeleteActivity = (activity: DetailPackageSchema) => {
    confirmDeleteAlert("Activity", activity.description, async () => {
      await deleteDetailPackage({
        activity: activity.activity,
        day: activity.day,
        package_id: activity.package_id,
      });
    });
  };

  const handleDeleteService = (service: ServicePackage) => {
    confirmDeleteAlert("Service", service.name, async () => {
      await deleteDetailService({
        service_package_id: service.id,
        package_id: id,
      });
    });
  };

  const handleDeletePackage = () => {
    confirmDeleteAlert("Package", data?.name ?? "", async () => {
      await deletePackage(id );
    });
  };

  const handleSubmit = (
    values: PackageDayFormSchema | PackageActivityFormSchema | ServiceFormSchema
  ) => {
    if (formType === "day") {
      createPackageDay(values as PackageDayFormSchema);
    } else if (formType === "update") {
      updatePackageDay(values as PackageDayFormSchema);
    } else if (formType === "activity") {
      createDetailPackage(values as PackageActivityFormSchema);
    } else if (formType === "service") {
      createDetailService(values as ServiceFormSchema);
    }
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
  };
};

export default useExtendPackage;
