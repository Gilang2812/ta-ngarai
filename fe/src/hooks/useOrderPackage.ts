import { useCreateModifyPackage } from "@/features/web/extend/useCreateModifyPackage";
import { useRouter } from "next/navigation";
import { PackageSchema } from "@/types/schema/PackageSchema";
import { ROUTES } from "@/data/routes";
import { cornerAlert, showLoadingAlert } from "@/utils/AlertUtils";
import { useEffect } from "react";

export const useOrderPackage = () => {
  const router = useRouter();
  
  const { mutate, isPending } = useCreateModifyPackage({
    onSuccess(data) {
      const response = data as {
        newPackage: PackageSchema;
        type: "custom" | "extend";
      };
      cornerAlert("ready to custom/extend");
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
    if (isPending) {
      showLoadingAlert();
    }
  }, [isPending]);

  return { handleModifyPackage };
};
