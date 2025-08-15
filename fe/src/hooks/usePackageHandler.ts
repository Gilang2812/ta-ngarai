import { useCreatePackageDay } from "@/features/web/extend/useCreatePackageDay";
import { useDeletePackageDay } from "@/features/web/extend/useDeletePackageDay";
import { useUpdatePackageDay } from "@/features/web/extend/useUpdatePackageDay";
import { useCreateDetailPackage } from "@/features/web/extend/useCreateDetailPackage";
import { useDeleteDetailPackage } from "@/features/web/extend/useDeleteDetailPackage";
import { useCreateDetailService } from "@/features/web/extend/useCreateDetailService";
import { useDeleteDetailService } from "@/features/web/extend/useDeleteDetailServie";
import { confirmDeleteAlert, cornerAlert, showLoadingAlert } from "@/utils/AlertUtils";
import { useModal } from "@/utils/ModalUtils";
import {
  DetailPackageSchema,
  PackageActivityFormSchema,
  PackageDay,
  PackageDayFormSchema,
} from "@/type/schema/PackageSchema";
import {
  DetailServiceFormSchema,
  ServicePackage,
} from "@/type/schema/ServiceSchema";
import { useEffect, useMemo, useState } from "react";

const usePackageHandler = (
  id: string,
  callback: () => void,
  missingDay: number
) => {
  const { isOpen, toggleModal } = useModal();
  const [formType, setFormType] = useState<
    "day" | "update" | "activity" | "service"
  >("day");
  const [dayInitialValues, setDayInitialValues] =
    useState<PackageDayFormSchema>({
      current_day: "" as unknown as number,
      package_id: id,
      day: 0,
      description: "",
      status: 1,
    });
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

  const getServiceInitialValues: DetailServiceFormSchema = useMemo(
    () => ({
      package_id: id,
      service_package_id: "",
      status: 1,
      status_created: 1,
    }),
    [id]
  );
  const { mutate: createPackageDay, isPending: isCreatingPackageDay } =
    useCreatePackageDay({
      onSuccess: () => {
        callback();
        toggleModal();
        cornerAlert("Package day created successfully");
      },
    });

  const { mutateAsync: deletePackageDay, isPending: isDeletingPackageDay } =
    useDeletePackageDay({
      onSuccess: () => {
        cornerAlert("Package day deleted successfully");
        callback();
      },
    });

  const { mutate: updatePackageDay, isPending: isUpdatingPackageDay } =
    useUpdatePackageDay({
      onSuccess: () => {
        callback();
        toggleModal();
        cornerAlert("Package day updated successfully");
      },
    });

  const { mutate: createDetailPackage, isPending: isCreatingDetailPackage } =
    useCreateDetailPackage({
      onSuccess: () => {
        callback();
        toggleModal();
        cornerAlert("Activity created successfully");
      },
    });

  const {
    mutateAsync: deleteDetailPackage,
    isPending: isDeletingDetailPackage,
  } = useDeleteDetailPackage({
    onSuccess: () => {
      callback();
      cornerAlert("Activity deleted successfully");
    },
  });

  const { mutate: createDetailService, isPending: isCreatingDetailService } =
    useCreateDetailService({
      onSuccess: () => {
        callback();
        toggleModal();
        cornerAlert("Service created successfully");
      },
    });

  const {
    mutateAsync: deleteDetailService,
    isPending: isDeletingDetailService,
  } = useDeleteDetailService({
    onSuccess: () => {
      callback();
      cornerAlert("Service deleted successfully");
    },
  });

  const isPending =
    isCreatingPackageDay ||
    isUpdatingPackageDay ||
    isCreatingDetailPackage ||
    isCreatingDetailService;
  useEffect(() => {
    if (
      isDeletingDetailPackage ||
      isDeletingDetailService ||
      isDeletingPackageDay
    ) {
      showLoadingAlert();
    }
  }, [isDeletingDetailPackage, isDeletingDetailService, isDeletingPackageDay]);

  const handleAddDay = () => {
    setFormType("day");

    setDayInitialValues((prev) => ({
      ...prev,
      day: missingDay,
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

  const handleSubmit = (
    values:
      | PackageDayFormSchema
      | PackageActivityFormSchema
      | DetailServiceFormSchema
  ) => {
    if (formType === "day") {
      createPackageDay(values as PackageDayFormSchema);
    } else if (formType === "update") {
      updatePackageDay(values as PackageDayFormSchema);
    } else if (formType === "activity") {
      createDetailPackage(values as PackageActivityFormSchema);
    } else if (formType === "service") {
      createDetailService(values as DetailServiceFormSchema);
    }
  };
  return {
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

export default usePackageHandler;
