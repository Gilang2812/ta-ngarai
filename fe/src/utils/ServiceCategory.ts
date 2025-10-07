import {
  PackageService,
  PackageServiceGallery,
} from "@/types/schema/PackageSchema";

export const useService = (
  category: 0 | 1,
  data?: PackageServiceGallery | PackageService
) => {
  return data?.detailServices?.filter((service) => service.status === category);
};
