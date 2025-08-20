import { ROUTES } from "@/data/routes";
import { useCreateModifyPackage } from "@/features/web/extend/useCreateModifyPackage";
import { useFetchPackages } from "@/features/web/package/useFetchPackage";
import { useModifyPackage } from "@/features/web/package/useModifyPackage";
import { PackageGallery, PackageSchema } from "@/type/schema/PackageSchema";
import { showLoadingAlert } from "@/utils/AlertUtils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const usePackageList = () => {
  const router = useRouter();
  const { data, isLoading } = useFetchPackages<PackageGallery>({
    package: true,
    gallery: true,
  });
  const { mutate: createPackage, isPending: isCreating } = useModifyPackage({
    onSuccess: (data) => {
      const response = data as PackageSchema;
      router.push(ROUTES["CUSTOM_PACKAGE"](response.id));
    },
  });

  const { mutate, isPending } = useCreateModifyPackage({
    onSuccess(data) {
      const response = data as {
        newPackage: PackageSchema;
        type: "custom" | "extend";
      };

      const route =
        response.type === "custom"
          ? ROUTES["CUSTOM_PACKAGE"](response.newPackage.id)
          : ROUTES["EXTEND_PACKAGE"](response.newPackage.id);

      router.push(route);
    },
  });

  const handleModifyPackage = ({
    packageId,
    isCustom = false,
    isNew = false,
  }: {
    packageId: string;
    isCustom?: boolean;
    isNew?: boolean;
  }) => {
    mutate({ id: packageId, isCustom, isNew });
  };

  useEffect(() => {
    if (isPending || isCreating) {
      showLoadingAlert();
    }
  }, [isPending, isCreating]);

  return {
    data,
    isLoading,
    mutate,
    isPending,
    handleModifyPackage,
    createPackage,
  };
};
