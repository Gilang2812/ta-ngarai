import { useGetPackage } from "@/features/web/package/useGetPackage";
import { PackageServiceGallery } from "@/types/schema/PackageSchema";

export const useDetailPackage = (id: string) => {
  const { data, isLoading } = useGetPackage<PackageServiceGallery>(id, ['gallery','package','service']);
  return { data, isLoading };
};
