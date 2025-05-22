import { axiosInstance } from "@/lib/axios";
import {
  Craft,
  CraftVariant,
  CraftVariantGallery,
} from "@/type/schema/CraftSchema";
import { useQuery } from "@tanstack/react-query";

export const useGetVariant = (id: string) => {
  return useQuery<
    CraftVariant & { craft: Craft; craftGalleries: CraftVariantGallery[] }
  >({
    queryKey: ["variant", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/variants/${id}`);
      return data;
    },
  });
};
