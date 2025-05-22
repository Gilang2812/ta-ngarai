import { axiosInstance } from "@/lib/axios";
import { Craft, CraftVariant, CraftVariantGallery } from "@/type/schema/CraftSchema";
import { GallerySchema } from "@/type/schema/GallerySchema";
import { useQuery } from "@tanstack/react-query";

export const useFetchCraftVariant = () => {
  return useQuery<(CraftVariant & { craft: Craft, craftGalleries: CraftVariantGallery[] })[]>({
    queryKey: ["craftVariant"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/variants");
      return data;
    },
  });
};
