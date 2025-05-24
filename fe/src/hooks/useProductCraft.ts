import { useFetchCraftVariant } from "@/features/dashboard/craftVariant/useFetchCraftVariant";
import { CraftProduct } from "@/type/schema/CraftSchema";

export const useProductCraft = () => {
  const { data: crafts, isLoading } = useFetchCraftVariant<CraftProduct>([
    "checkout",
    "craft",
    "craftGalleries",
  ]);
  return {
    crafts,
    isLoading,
  };
};
