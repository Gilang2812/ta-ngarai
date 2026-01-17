import { ROUTES } from "@/data/routes";
import { useFetchPackages } from "@/features/web/package/useFetchPackage";
import { useModifyPackage } from "@/features/web/package/useModifyPackage";
import { PackageGallery, PackageSchema } from "@/types/schema/PackageSchema";
import { cornerAlert, showLoadingAlert } from "@/utils/AlertUtils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useOrderPackage } from "./useOrderPackage";

export const usePackageList = () => {
  const router = useRouter();

  const { data, isLoading } = useFetchPackages<PackageGallery>({
    package: true,
    gallery: true,
  });

  const { mutate: createPackage, isPending: isCreating } = useModifyPackage({
    onSuccess: (data) => {
      const response = data as PackageSchema;
      cornerAlert("ready to custom");
      router.push(ROUTES["CUSTOM_PACKAGE"](response.id));
    },
  });

  const { handleModifyPackage } = useOrderPackage();

  useEffect(() => {
    if (isCreating) {
      showLoadingAlert();
    }
  }, [isCreating]);

  return {
    data,
    isLoading,
    handleModifyPackage,
    createPackage,
  };
};
